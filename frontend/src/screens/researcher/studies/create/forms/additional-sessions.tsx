import { Box, React } from '@common';
import { Button, Col, FieldTitle, Icon, StepHeader, useFormContext } from '@components';
import { colors } from '@theme';
import { NewStage, Stage, Study } from '@api';
import { useFieldArray } from 'react-hook-form';
import { StudyFeedback } from './participant-view';

export const AdditionalSessions: FC<{study: Study}> = () => {
    return (
        <Box className='mt-6' direction='column' gap='xlarge'>
            <StepHeader title='Additional sessions (optional)' eta={2}>
                <p>If you wish to gather delayed measures for a longitudinal study, you can opt to add additional sessions below. Alternatively, simply click ‘Continue’ to keep it as a single session study.</p>
            </StepHeader>

            <Sessions />
        </Box>
    )
}

const Sessions: FC = () => {
    const { control } = useFormContext<Study>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'stages',
        keyName: 'customId',
    })

    const addSession = () => {
        append({ order: fields.length, config: {}, id: -1 })
    }

    const removeSession = (index: number) => {
        remove(index)
    }

    return (
        <Col direction='column' sm={8} gap='large'>
            {fields.map((stage, index) => (
                <AdditionalSession
                    key={stage.id}
                    index={index}
                    session={stage}
                    onDelete={removeSession}
                />
            ))}

            <Button
                icon='plus'
                align='center'
                data-testid='add-session'
                css={{
                    border: `1px solid ${colors.gray50}`,
                    padding: 12,
                }}
                onClick={addSession}
            >
                Add Additional Sessions
            </Button>
        </Col>
    )
}


const AdditionalSession: FC<{
    index: number,
    onDelete: (index: number) => void,
    session: Stage | NewStage
}> = ({ index, onDelete, session }) => {
    const { register, getValues } = useFormContext()

    // don't show the first session
    if (index === 0) return null
    const prevStagePoints = getValues(`stages.${index - 1}.points`)

    return (
        <Col direction='column' css={{ border: `1px solid ${colors.gray50}`, borderRadius: 10 }}>
            <Box css={{ backgroundColor: colors.gray30, padding: `1rem`, borderRadius: `10px 10px 0 0` }} justify='between'>
                <h4>Session {index + 1}</h4>
                <Icon color={colors.red} icon='trash' onClick={() => onDelete(index) } />
            </Box>

            <Box direction='column' css={{ padding: '1rem' }} gap='xlarge'>
                <Box gap='xlarge'>
                    <Col sm={4} direction='column' gap>
                        <FieldTitle required>Session Duration</FieldTitle>
                        <small>Select the option that best describes your estimated session duration.</small>
                    </Col>

                    <Col sm={6} gap>
                        <Box direction='column'>
                            <Box gap>
                                <input
                                    type='radio'
                                    id={`min-5-${index}`}
                                    value={5}
                                    {...register(`stages.${index}.durationMinutes`)}
                                    defaultChecked={session?.durationMinutes === 5}
                                />
                                <label htmlFor={`min-5-${index}`}>~5 minutes</label>
                            </Box>
                            <Box gap>
                                <input
                                    type='radio'
                                    id={`min-15-${index}`}
                                    value={15}
                                    {...register(`stages.${index}.durationMinutes`)}
                                    defaultChecked={session?.durationMinutes === 15}
                                />
                                <label htmlFor={`min-15-${index}`}>~15 minutes</label>
                            </Box>
                            <Box gap>
                                <input
                                    type='radio'
                                    id={`min-25-${index}`}
                                    value={25}
                                    {...register(`stages.${index}.durationMinutes`)}
                                    defaultChecked={session?.durationMinutes === 25}
                                />
                                <label htmlFor={`min-25-${index}`}>~25 minutes</label>
                            </Box>
                        </Box>
                    </Col>
                </Box>

                {/* TODO: Remove display: none when points are ready */}
                <Box gap='xlarge' style={{ display: 'none' }}>
                    <Col sm={4} direction='column' gap>
                        <FieldTitle>Session Points</FieldTitle>
                        <small>Each additional session observes a 5pt increment from previous session points to support learner engagement.</small>
                    </Col>

                    <Col sm={6} gap>
                        <Box gap>
                            <input
                                type='radio'
                                id='pts'
                                readOnly={true}
                                checked={true}
                                {...register(`stages.${index}.points]`)}
                                value={+prevStagePoints + 5}
                            />
                            <label htmlFor="pts">{+prevStagePoints + 5} points</label>
                        </Box>
                    </Col>
                </Box>

                <StudyFeedback sessionIndex={index} />
            </Box>
        </Col>
    )
}
