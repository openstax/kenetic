import { React, useEffect, useState, useMemo, useCallback, cx } from '@common'
import { ParticipantStudy } from '@api'
import styled from '@emotion/styled'
import { colors } from '../theme'
import { tagOfType } from '@models'
import { Global } from '@emotion/react'
import { sortBy, groupBy } from 'lodash'
import {
    Box, RewardsProgressBar, BannersBar, NavbarLogoLink,
} from '@components'
import { useApi, useEnvironment } from '@lib'
import {
    isStudyLaunchable, StudyTopicTags, StudyTopicTagIDs, StudyTopicID,
} from '@models'
import { StudyCard } from './learner/card'
import { Footer } from './learner/footer'
import { SplashImage } from './learner/splash-image'
import { StudyModal } from './studies/modal'
import { StudyDetails } from './learner/details'
import { Route, Routes, useNavigate } from 'react-router-dom'

const Splash = styled(Box)({
    height: 400,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
})

type StudyByTopics = Record<StudyTopicID, ParticipantStudy[]>

interface StudyState {
    mandatoryStudy?: ParticipantStudy
    allStudies: ParticipantStudy[]
    popularStudies: ParticipantStudy[]
    studiesByTopic: StudyByTopics
}

const useParticpantStudies = () => {
    const api = useApi()
    const [filter, setFilter] = useState<StudyTopicID>('topic:personality')
    const [studies, setStudyState] = useState<StudyState>({
        allStudies: [],
        popularStudies: [],
        studiesByTopic: {} as StudyByTopics,
    })

    const fetchStudies = useCallback(async () => {
        const fetchedStudies = await api.getParticipantStudies()
        const mandatoryStudy = fetchedStudies.data?.find(s => isStudyLaunchable(s) && s.isMandatory)
        const allStudies = fetchedStudies.data || []
        const popularStudies = sortBy(allStudies, 'popularity_rating').slice(0, 3)
        const studiesByTopic = groupBy(allStudies, (s) => tagOfType(s, 'topic') || 'topic:other') as any as StudyByTopics
        if (!studiesByTopic[filter]) {
            setFilter((Object.keys(studiesByTopic) as Array<StudyTopicID>)[0])
        }
        setStudyState({
            mandatoryStudy, allStudies, popularStudies, studiesByTopic,
        })
    }, [setStudyState])


    useEffect(() => {
        fetchStudies()
    }, [])

    const onMandatoryClose = useCallback(() => {
        setStudyState({ ...studies, mandatoryStudy: undefined })
        fetchStudies()
    }, [fetchStudies])

    return useMemo(() => ({
        ...studies,
        filter,
        setFilter,
        onMandatoryClose,
    }), [studies, onMandatoryClose, filter, setFilter])
}


interface StudyListProps {
    studies: ParticipantStudy[],
    title: string
    className: string
    onSelect(study: ParticipantStudy): void
}

const Grid = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, [col-start] minmax(100px, 1fr) [col-end])',
    gridColumnGap: 20,
    gridRowGap: 20,
})

const StudyList: React.FC<StudyListProps> = ({ className, onSelect, title, studies, children }) => {

    return (
        <div className={cx('container-lg', 'studies', 'my-8', className)} >
            <h3 css={{ margin: '2rem 0' }}>{title}</h3>
            {children}
            {!studies.length && <h3>No studies were found</h3>}
            <Grid>
                {studies.map(s => <StudyCard onSelect={onSelect} study={s} key={s.id} />)}
            </Grid>
        </div>
    )
}

interface FiltersProps {
    studies: StudyByTopics
    filter: StudyTopicID
    setFilter(filter: StudyTopicID): void
}


const filterProps = (type: StudyTopicID, filter: StudyTopicID, setType: (t: StudyTopicID) => void) => ({
    className: type == filter ? 'active' : '',
    'data-test-id': type,
    onClick() { setType(type) },
})

const Filters: React.FC<FiltersProps> = ({ studies, filter, setFilter }) => {

    return (
        <Box gap="large" data-test-id="topic-tabs" wrap margin={{ bottom: 'large' }}
            css={{
                span: {
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderBottom: '3px solid transparent',
                    color: colors.grayText,
                    '&.active': {
                        borderBottomColor: colors.purple,
                        color: colors.purple,
                    },
                },
            }}
        >
            {StudyTopicTagIDs.map((tag) => (
                studies[tag]?.length ?
                    <span role="tab" key={tag} {...filterProps(tag, filter, setFilter)}>{StudyTopicTags[tag]}</span> : null
            ))}
        </Box >
    )
}
const LearnerDashboard = () => {
    const env = useEnvironment()
    const nav = useNavigate()
    const onStudySelect = useCallback((s: ParticipantStudy) => nav(`/studies/details/${s.id}`), [nav])
    const {
        popularStudies, mandatoryStudy, allStudies, filter, onMandatoryClose, setFilter, studiesByTopic,
    } = useParticpantStudies()

    return (
        <div className="studies learner">
            <Routes>
                <Route path={'details/:studyId'} element={<StudyDetails studies={allStudies} />} />
            </Routes>
            <StudyModal study={mandatoryStudy} onHide={onMandatoryClose} />
            <Global styles={{ background: colors.pageBackground }} />
            <nav className="navbar navbar-light">
                <div className="navbar-dark bg-dark py-1">
                    <div className="container-lg">
                        <NavbarLogoLink />
                    </div>
                </div>
                <BannersBar />
            </nav>
            <RewardsProgressBar studies={allStudies} />

            <Splash direction='column' justify='center'>
                <SplashImage
                    preserveAspectRatio='xMinYMid slice'
                    css={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                    }}
                />
                <div className="container-lg">
                    <div css={{ maxWidth: 500, p: { marginBottom: 5 } }}>
                        <h2>Learning Pays,</h2>
                        <h2>In More Ways Than One!</h2>
                        <p>
                            Learning doesn’t have to be boring - and it can even win you prizes!
                        </p>
                        <p>
                            With OpenStax Kinetic, you are guaranteed to learn something new everyday!
                        </p>
                    </div>
                </div>
            </Splash >

            <StudyList onSelect={onStudySelect} title="Popular Studies on Kinetic" className="popular" studies={popularStudies} />

            <StudyList onSelect={onStudySelect} title="View All Studies" className="filtered" studies={studiesByTopic[filter] || []}>
                <Filters studies={studiesByTopic} filter={filter} setFilter={setFilter} />
            </StudyList>

            <Footer />
        </div >
    )
}


export default LearnerDashboard
