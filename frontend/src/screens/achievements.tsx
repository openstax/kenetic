import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Text,
    Button,
    SimpleGrid,
    Container,
    Title,
    Group,
    RingProgress,
    Image,
} from '@mantine/core';
import { TopNavBar, Footer } from '@components';
import { colors } from '@theme';
import { StudyDetailsPreview } from '../screens/learner/details';
import { useParticipantStudies } from './learner/studies';

const BadgeDetail = ({
    badge,
    onClose,
}: {
    badge: any;
    onClose: () => void;
}) => {
    const detailRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                detailRef.current &&
                !detailRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!badge) return null;
    return (
        <Box
            ref={detailRef}
            p="md"
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                zIndex: 1001,
                maxWidth: '400px',
                width: '100%',
            }}
        >
            <Button
                onClick={onClose}
                style={{ position: 'absolute', top: '10px', right: '10px' }}
            >
                X
            </Button>
            <Title order={3} mb="md">
                {badge?.learningPath?.label}
            </Title>
            <Text mb="md">{badge?.learningPath?.description}</Text>
            <Text size="sm" color="dimmed" mb="md">
                {badge?.learningPath?.level2Metadata
                    .map((item: string) => `#${item}`)
                    .join(', ')}
            </Text>
            {badge?.learningPath?.level2Metadata.map(
                (item: any, index: number) => (
                    <Box key={index} mb="md">
                        <Text fw={600}>{item}</Text>
                        <Text>{item.description}</Text>
                    </Box>
                )
            )}
            <Button fullWidth>Start next study</Button>
        </Box>
    );
};

const AchievementBadge = ({
    study,
    onBadgeClick,
    onStudySelect,
}: {
    study: any;
    onBadgeClick: (study: any) => void;
    onStudySelect: (study: any) => void;
}) => {
    const completedStudies = study?.learningPath?.studies.filter(
        (s: any) => s.completedCount !== 0
    ).length;
    const progress =
        (completedStudies / study?.learningPath?.studies.length) * 100 || 0;
    const isCompleted = progress === 100;
    const buttonText = isCompleted
        ? 'Download Certificate'
        : progress > 0
            ? 'Continue'
            : 'Start';

    // event block statement to download pdf        

    const handleButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();
        if (isCompleted) {
        } else {
            const nextStudy = study?.learningPath?.studies.find(
                (s: any) => s.completedCount === 0
            );
            if (nextStudy) {
                onStudySelect(study);
            }
        }
    };

    return (
        <Box
            style={{
                width: 280,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                margin: '0 20px',
                cursor: 'pointer',
                borderRadius: '8px',
            }}
            onClick={() => onBadgeClick(study)}
        >
            <Box
                style={{
                    width: '100%',
                    height: '280px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <RingProgress
                    size={370}
                    thickness={14}
                    sections={[
                        {
                            value: progress,
                            color: isCompleted ? colors.purple : colors.green,
                        },
                    ]}
                    style={{ position: 'absolute' }}
                />
                <Box
                    style={{
                        width: '250px',
                        height: '250px',
                        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                        background: study.learningPath?.badge.image ? 'none' : colors.white,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}

                >
                    <Image
                        src={study.learningPath?.badge.image}
                        alt={`Badge for ${study?.learningPath?.label}`}
                        style={{
                            width: '95%',
                            height: '95%',
                            objectFit: 'contain',
                        }}
                    />
                </Box>
            </Box>
            <Box
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px',
                    paddingTop: '30px',
                }}
            >
                <Text
                    size="sm"
                    fw={400}
                    mb={4}
                    style={{
                        fontFamily: 'Helvetica Neue',
                        fontSize: 16,
                        lineHeight: '24px',
                        textAlign: 'center',
                    }}
                >
                    Learning
                </Text>
                <Text
                    mb={5}
                    style={{
                        fontFamily: 'System-ui',
                        fontSize: 18,
                        fontWeight: 700,
                        lineHeight: '28px',
                        textAlign: 'center',
                    }}
                >
                    {study?.learningPath?.label}
                </Text>
                <Text
                    size="xs"
                     color="dimmed"
                    mb={10}
                    style={{
                        fontFamily: 'System-ui',
                        fontSize: 12,
                        lineHeight: '18px',
                        textAlign: 'center',
                        color: colors.gray70,
                    }}
                >
                    {`${completedStudies} of ${study?.learningPath?.studies.length}`}
                </Text>
                <Button
                    onClick={handleButtonClick}
                    style={{
                        width: '200px',
                        height: '30px',
                        padding: '8px 20px',
                        gap: '30px',
                        borderRadius: '4px',
                        border: `1px solid ${colors.purple}`,
                        backgroundColor: 'white',
                        color: colors.purple,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {buttonText}
                </Button>
            </Box>
        </Box>
    );
};

const TabButton = ({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) => (
    <Button
        variant="subtle"
        color={isActive ? colors.blue : 'black'}
        onClick={onClick}
        style={{
            padding: '8px 16px',
            fontWeight: 500,
            fontSize: '16px',
            textTransform: 'uppercase',
            borderBottom: isActive ? `2px solid ${colors.purple}` : 'none',
            borderRadius: 0,
        }}
    >
        {label}
    </Button>
);


const Achievements = () => {
    const [selectedTab, setSelectedTab] = useState<'Badges' | 'Points'>(
        'Badges'
    );
    const [selectedStudy, setSelectedStudy] = useState(null);
    const [badgeDetail, setBadgeDetail] = useState(null);

    const DATA = useParticipantStudies();  
    const handleTabClick = (tab: any) => setSelectedTab(tab);
    const handleBadgeClick = (study: any) => {
        setBadgeDetail(study);
    };
    const handleCloseDetail = () => {
        setBadgeDetail(null);
    };
    const handleCloseStudyDetails = () => {
        setSelectedStudy(null);
    };
    const handleStudySelect = (study: any) => setSelectedStudy(study);

    const renderContent = () => {
        switch (selectedTab) {
            case 'Badges':
                return (
                    <Box>
                        <Text
                            style={{ marginBottom: '60px', fontSize: '20px' }}
                        >
                            Explore the study paths, track your progress, and
                            access your digital badges.
                        </Text>
                        <SimpleGrid
                            cols={{ base: 1, sm: 2, md: 3 }}
                            spacing={{ base: 40, sm: 60, md: 110 }}
                            style={{
                                marginTop: '100px',
                                padding: {
                                    base: '330px',
                                    sm: '40px',
                                    md: '50px',
                                },
                            }}
                        >
                            {DATA.studies.map((study) => (
                                <AchievementBadge
                                    key={study.id}
                                    study={study}
                                    onBadgeClick={handleBadgeClick}
                                    onStudySelect={handleStudySelect}
                                />
                            ))}
                        </SimpleGrid>
                        {badgeDetail && (
                            <BadgeDetail
                                badge={badgeDetail}
                                onClose={handleCloseDetail}
                            />
                        )}
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box>
            <TopNavBar />
            <Container size="lg" my="xl">
                <Title mb="xl" mt="lg" order={2}>
                    Achievements
                </Title>
                <Group mb="lg">
                    <TabButton
                        label="Badges"
                        isActive={selectedTab === 'Badges'}
                        onClick={() => handleTabClick('Badges')}
                    />
                </Group>
                {renderContent()}  {/* Always render content without loading check */}
            </Container>
            <Footer />
            {selectedStudy && (
                <StudyDetailsPreview
                    study={selectedStudy}
                    show={!!selectedStudy}
                    onHide={handleCloseStudyDetails}
                />
            )}
        </Box>
    );
};

export default Achievements;