import { cx, React, useCallback } from '@common'
import { Box, Icon, MultiSessionBar } from '@components'
import { get } from 'lodash'
import { useIsMobileDevice } from '@lib'
import { EditingStudy, studyIsMultipart, TagLabels, tagOfType, tagsOfType } from '@models'
import { ParticipantStudy } from '@api'
import styled from '@emotion/styled'
import { CardImages } from '../../components/study-card-images'
import { colors, media } from '@theme'
import { Image } from '@faker-js/faker/image';
import { getImageUrl } from '../../components/study-card-images/card-images';

interface StudyCardProps {
    study: ParticipantStudy
    className?: string
}

const Card = styled(Box)({
    minWidth: 300,
    maxWidth: 450,
    backgroundColor: 'white',
    padding: '1rem',
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    minHeight: 450,
    maxHeight: 450,
    '&:hover': {
        boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.4)',
    },
    '.study-card-image': {
        height: 200,
        minHeight: 200,
        maxHeight: 200,
    },
    [media.mobile]: {
        minWidth: 275,
        maxWidth: 275,
        margin: '0 auto',
        padding: '1rem',
        minHeight: 360,
        maxHeight: 360,
        '.study-card-image': {
            minHeight: '35%',
            maxHeight: '35%',
            height: '35%',
        },
    },
})

const Tag: React.FC<{ tag?: string }> = ({ tag }) => (
    tag ? <span className="badge text-dark" css={{ borderRadius: 8, background: colors.gray }}>{get(TagLabels, tag, tag)}</span> : null
)

const Researcher: React.FC<StudyCardProps> = ({ study }) => {
    const pi = study.researchers?.find(r => r.role === 'pi')
    if (!pi) return null

    return (
        <Box className='x-small' padding={{ bottom: 'small' }}>
            {pi.firstName} {pi.lastName}
        </Box>
    )
}

const Feedback: React.FC<StudyCardProps> = ({ study }) => {
    if (!study.feedbackDescription) return <span />

    return (
        <Box align='center' gap>
            <Icon height={15} icon="feedback" color={colors.purple} />
            <span>Feedback Available</span>
        </Box>
    )
}

const MultiSession: React.FC<StudyCardProps> = ({ study }) => {
    if (!studyIsMultipart(study)) return <span />

    return (
        <Box align='center' gap>
            <Icon
                height={15}
                icon="multiStage"
                color={colors.purple}
                tooltip="This study has multiple sessions. The other sessions will be released once available."
            />
            <span>Multi-Session</span>
        </Box>
    )
}

const CompleteFlag: React.FC<StudyCardProps> = ({ study }) => {
    if (!study.completedAt) return null

    return (
        <Box gap
            align="center"
            padding="default"
            css={{
                backgroundColor: colors.green,
                position: 'absolute',
                borderBottomLeftRadius: 20,
                borderTopLeftRadius: 20,
                right: 0,
                top: 16,
            }}
        >
            <Icon icon="checkCircle" color='white' />
            <span>Complete</span>
        </Box>
    )
}

const MultiSessionFlag: FC<StudyCardProps> = ({ study }) => {
    if (!studyIsMultipart(study) || !study.stages?.[0].isCompleted || study.stages?.[1].isCompleted) return null

    return (
        <div
            css={{
                position: 'absolute',
                borderBottomLeftRadius: 20,
                borderTopLeftRadius: 20,
                right: 0,
                top: 16,
                width: 250,
                backgroundColor: 'white',
                zIndex: 3,
                height: 80,
                padding: 20,
                display: 'flex',
                flex: 1,
                overflow: 'hidden',
                boxShadow: '0px 4px 8px rgb(0 0 0 / 18%)',
            }}
        >
            <MultiSessionBar study={study} />
        </div>
    )
}

const FeedbackMultiSessionContainer: FC<StudyCardProps> = ({ study }) => {
    if (!study.feedbackDescription && !studyIsMultipart(study)) {
        return (
            <Box margin={{ top: 'default', bottom: 'default' }}></Box>
        )
    }
    const isMobile = useIsMobileDevice();

    return (
        <Box
            className={cx({ 'xx-small': isMobile })}
            justify='between'
            wrap
            margin={{ top: 'default' }}
            css={{ minHeight: 35 }}
        >
            <Feedback study={study} />
            <MultiSession study={study} />
        </Box>
    )
}

const PointsAndDuration: FC<StudyCardProps> = ({ study }) => {
    const isMobile = useIsMobileDevice();

    return (
        <Box className={cx({ 'small': !isMobile, 'xx-small': isMobile }, 'mt-auto', 'pt-1')} justify='between' align='center' wrap>
            <Box gap='small'>
                <Tag tag={tagOfType(study, 'topic')} />
                {tagsOfType(study, 'subject').slice(0, 1).map(tag => <Tag key={tag} tag={tag} />)}
            </Box>
            <Box>
                {!!study.totalDuration && <div>
                    {studyIsMultipart(study) && <span>*Total: </span>}
                    {study.totalDuration}min
                </div>}

                {!!study.totalPoints && <span>&nbsp;&middot; {study.totalPoints}pts</span>}
            </Box>
        </Box>
    )
}

export const StudyCard: React.FC<StudyCardProps & { onSelect(study: ParticipantStudy): void }> = ({
    onSelect,
    study,
}) => {
    const onClick = useCallback(() => onSelect(study), [onSelect]);

    return (
        <Card
            as="a"
            role={'link'}
            className="col study"
            direction='column'
            data-study-id={study.id}
            data-is-completed={!!study.completedAt}
            onClick={onClick}
        >
            <CardContent study={study} />
        </Card>
    )
}

const CardContent: FC<{study: ParticipantStudy}> = ({ study }) => {
    const isMobile = useIsMobileDevice();

    return (
        <>
            <img src={getImageUrl(study.imageId)}
                alt={study.imageId}
                className='study-card-image'
                css={{
                    border: `1px solid ${colors.lightGray}`,
                    borderRadius: 8,
                }}
            />
            <CompleteFlag study={study} />
            <MultiSessionFlag study={study} />
            <FeedbackMultiSessionContainer study={study} />
            <h6>{study.titleForParticipants}</h6>
            <Researcher className="xx-small" study={study} />
            <small
                className={cx({ 'x-small': isMobile })}
                css={{ color: colors.grayText, overflowWrap: 'anywhere' }}
            >
                {study.shortDescription}
            </small>
            <PointsAndDuration study={study} />
        </>
    )
}

export const StudyCardPreview: FC<{study: EditingStudy}> = ({ study }) => {
    return (
        <Card className="col study" direction='column'>
            <CardContent study={study as ParticipantStudy} />
        </Card>
    )
}
