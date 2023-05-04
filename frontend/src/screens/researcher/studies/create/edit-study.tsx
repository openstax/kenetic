import { Box, React, useEffect, useNavigate, useParams, useState, Yup } from '@common'
import { useApi, useQueryParam } from '@lib';
import { EditingStudy, getStudyStatus } from '@models';
import { Button, Col, Form, Icon, LoadingAnimation, Modal, TopNavBar, useFormContext, useFormState } from '@components';
import { StudyCreationProgressBar } from './study-creation-progress-bar';
import { researcherValidation, ResearchTeam } from './forms/research-team';
import { InternalDetails, internalDetailsValidation } from './forms/internal-details';
import { ParticipantView, participantViewValidation } from './forms/participant-view';
import { AdditionalSessions, additionalSessionsValidation } from './forms/additional-sessions';
import { NewStudy, ResearcherRoleEnum, StageStatusEnum, Study } from '@api';
import { ActionFooter } from './action-footer';
import { ReactNode } from 'react';
import { colors } from '@theme';
import { ReviewStudy } from './forms/review-study';
import { FinalizeStudy } from './forms/finalize-study';
import { useNotificationStore } from '@store';
import { Toast } from '@nathanstitt/sundry/ui';

interface Action {
    text: string
    action?: Function
    disabled?: boolean
}

export interface Step {
    index: number
    component?: ReactNode
    text: string
    optional?: boolean
    primaryAction?: Action
    secondaryAction?: Action
    backAction?: () => void
}

const buildValidationSchema = (studies: Study[], study: EditingStudy) => {
    return Yup.object().shape({
        ...internalDetailsValidation(studies, study),
        ...researcherValidation(),
        ...participantViewValidation(studies, study),
        ...additionalSessionsValidation(),
    })
}

const getFormDefaults = (study: EditingStudy, step: StudyStep) => {
    const pi = study.researchers?.find(r => r.role === ResearcherRoleEnum.Pi)?.id
    const lead = study.researchers?.find(r => r.role === ResearcherRoleEnum.Lead)?.id
    return {
        ...study,
        step: step,
        researcherPi: pi,
        researcherLead: lead,
        stages: study.stages,
    }
}

export default function EditStudy() {
    const api = useApi()
    const [study, setStudy] = useState<EditingStudy | null>()
    const [allStudies, setAllStudies] = useState<Study[]>([])
    const id = useParams<{ id: string }>().id
    const isNew = 'new' === id

    useEffect(() => {
        api.getStudies().then(studies => {
            setAllStudies(studies.data || [])
            if (isNew) {
                setStudy({
                    titleForResearchers: '',
                    internalDescription: '',
                })
                return
            }
            const study = studies.data?.find(s => s.id == Number(id))
            if (study) {
                setStudy(study)
            } else {
                // setError('study was not found')
                // Navigate back to /studies if no study found?
            }
        })
    }, [id])

    if (!study) {
        return <LoadingAnimation message="Loading study details" />
    }

    return (
        <Box direction='column' className='edit-study vh-100 bg-white'>
            <TopNavBar hideBanner/>
            <StudyForm study={study} studies={allStudies}>
                <FormContent study={study} />
            </StudyForm>
        </Box>
    )
}

const StudyForm: FCWC<{ study: EditingStudy, studies: Study[] }> = ({ study, studies, children }) => {
    let initialStep = +useQueryParam('step') || StudyStep.InternalDetails

    if (getStudyStatus(study) === StageStatusEnum.WaitingPeriod) {
        initialStep = StudyStep.ReviewStudy
    }

    if (getStudyStatus(study) === StageStatusEnum.ReadyForLaunch) {
        initialStep = StudyStep.FinalizeStudy
    }

    return (
        <Form
            validationSchema={buildValidationSchema(studies, study)}
            defaultValues={getFormDefaults(study, initialStep)}
            onSubmit={() => {}}
            onCancel={() => {}}
        >
            {children}
        </Form>
    )
}

export enum StudyStep {
    InternalDetails = 0,
    ResearchTeam = 1,
    ParticipantView = 2,
    AdditionalSessions = 3,
    ReviewStudy = 4,
    FinalizeStudy = 5
}

const FormContent: FC<{study: EditingStudy}> = ({ study }) => {
    const { watch, setValue, trigger, getValues, reset } = useFormContext()
    const currentStep = watch('step')
    const id = useParams<{ id: string }>().id
    const isNew = 'new' === id
    const nav = useNavigate()
    const api = useApi()

    const { isValid, isDirty } = useFormState()

    const setStep = (step: StudyStep) => {
        nav(`/study/edit/${id}?step=${step}`)
        setValue('step', step, { shouldValidate: true })
    }

    const saveStudy = async () => {
        const study = getValues() as EditingStudy
        if (isNew) {
            const savedStudy = await api.addStudy({
                addStudy: {
                    study: study as NewStudy,
                },
            })
            if (savedStudy) {
                nav(`/study/edit/${savedStudy.id}?step=${currentStep + 1}`)
                setStep(currentStep + 1)
                Toast.show({
                    message: `New copy of ${study.titleForResearchers} has been created and saved as a draft. It can now be found under ‘Draft’.`,
                })
            }
        } else {
            if (!isDirty) {
                return;
            }

            const savedStudy = await api.updateStudy({ id: Number(id), updateStudy: { study: study as any } })
            reset(getFormDefaults(savedStudy, currentStep), { keepIsValid: true })
            Toast.show({
                message: `New edits to the study ${study.titleForResearchers}” have successfully been saved`,
            })
        }
    }

    const steps: Step[] = [
        {
            index: StudyStep.InternalDetails,
            component: <InternalDetails study={study} />,
            text: 'Internal Details',
            primaryAction: {
                text: 'Save & Continue',
                disabled: !isValid,
                action: async () => {
                    const valid = await trigger()
                    if (valid) {
                        await saveStudy()
                        setStep(StudyStep.ResearchTeam)

                    }
                },
            },
        },
        {
            index: StudyStep.ResearchTeam,
            component: <ResearchTeam study={study} />,
            text: 'Research Team',
            backAction: () => setStep(StudyStep.InternalDetails),
            primaryAction: {
                text: 'Continue',
                disabled: !isValid,
                action: async () => {
                    const valid = await trigger()
                    if (valid) {
                        await saveStudy()
                        setStep(StudyStep.ParticipantView)
                    }
                },
            },
            secondaryAction: {
                text: 'Save as draft',
                action: saveStudy,
                disabled: !isDirty,
            },
        },
        {
            index: StudyStep.ParticipantView,
            component: <ParticipantView study={study} />,
            text: 'Participant View',
            backAction: () => setStep(StudyStep.ResearchTeam),
            primaryAction: {
                text: 'Continue',
                disabled: !isValid,
                action: async () => {
                    const valid = await trigger()
                    if (valid) {
                        await saveStudy()
                        setStep(StudyStep.AdditionalSessions)
                    }
                },
            },
            secondaryAction: {
                text: 'Save as draft',
                action: saveStudy,
                disabled: !isDirty,
            },
        },
        {
            index: StudyStep.AdditionalSessions,
            component: <AdditionalSessions study={study} />,
            text: 'Additional Sessions (optional)',
            backAction: () => setStep(StudyStep.ParticipantView),
            optional: true,
            primaryAction: {
                text: 'Continue',
                disabled: !isValid,
                action: async () => {
                    const valid = await trigger()
                    if (valid) {
                        await saveStudy()
                        setStep(StudyStep.ReviewStudy)
                    }
                },
            },
            secondaryAction: {
                text: 'Save as draft',
                action: saveStudy,
                disabled: !isDirty,
            },
        },
        {
            index: StudyStep.ReviewStudy,
            component: <ReviewStudy study={study} />,
            text: 'Waiting Period',
            primaryAction: {
                text: 'Continue',
                action: () => {
                    if (getStudyStatus(study) === StageStatusEnum.WaitingPeriod) {
                        // do something?
                    }
                    setStep(StudyStep.ReviewStudy)
                },
            },
        },
        {
            index: StudyStep.FinalizeStudy,
            component: <FinalizeStudy study={study} />,
            text: 'Finalize Study',
            primaryAction: {
                text: 'Launch Study',
                action: () => {
                    // console.log('Launch!')
                },
            },
        },
    ]

    return (
        <Box direction='column' justify='between' className='bg-white h-100'>
            <div className="container-lg py-4 mb-10">
                <Box justify='between' gap='xxlarge'>
                    <Col sm={1}>
                        <span></span>
                    </Col>
                    <Col sm={9}>
                        <StudyCreationProgressBar steps={steps} currentStep={steps[currentStep]} setStepIndex={(i) => setStep(i)}/>
                    </Col>
                    <Col sm={1}>
                        {currentStep !== StudyStep.InternalDetails && <ExitButton study={getValues() as EditingStudy} saveStudy={saveStudy} />}
                    </Col>
                </Box>
                {steps[currentStep].component}
            </div>
            <ActionFooter step={steps[currentStep]} />
        </Box>
    )
}

const ExitButton: FC<{study: EditingStudy, saveStudy: (study: EditingStudy) => void}> = ({ study, saveStudy }) => {
    const [showWarning, setShowWarning] = useState<boolean>(false)
    const { getValues } = useFormContext()
    const { isDirty } = useFormState()
    const { addNotification } = useNotificationStore()

    const nav = useNavigate()
    return (
        <div>
            <h6
                css={{
                    textDecoration: 'underline',
                    textUnderlineOffset: '.5rem',
                    color: colors.grayText,
                    cursor: 'pointer',
                    alignSelf: 'end',
                }}
                onClick={() => {
                    if (isDirty) {
                        setShowWarning(true)
                    } else {
                        nav('/studies')
                    }
                }}
            >
                Exit
            </h6>
            <Modal
                center
                show={showWarning}
                large
                onHide={() => setShowWarning(false)}
            >
                <Modal.Body>
                    <Box padding='4rem' align='center' justify='center' direction='column' gap='large'>
                        <Box gap='large' align='center'>
                            <Icon height={20} icon="warning" color={colors.red} />
                            <span className='fs-4 fw-bold'>Exit Page</span>
                        </Box>
                        <Box align='center' direction='column'>
                            <span>You're about to leave this study creation process.</span>
                            <span>Would you like to save the changes you made thus far?</span>
                        </Box>
                        <Box gap='large'>
                            <Button className='btn-researcher-secondary' onClick={() => {
                                nav('/studies')
                                Toast.show({
                                    message: `New edits to the study ${study.titleForResearchers} have been discarded`,
                                })
                            }}>
                                No, discard changes
                            </Button>
                            <Button className='btn-researcher-primary' onClick={() => {
                                saveStudy(getValues() as EditingStudy)
                                nav('/studies')
                                Toast.show({
                                    message: `New edits to the study ${study.titleForResearchers} have successfully been saved`,
                                })
                            }}>
                               Yes, save changes
                            </Button>
                        </Box>
                    </Box>
                </Modal.Body>
            </Modal>
        </div>
    )
}
