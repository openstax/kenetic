import { React, styled } from '@common'
import { useRef } from 'react'
import { ParticipantStudy } from '@api'
import { Footer, TopNavBar, LoadingAnimation } from '@components'
import { useEnvironment, useIsMobileDevice, useIsTabletDevice } from '@lib'
import { useParticipantStudies, useSearchStudies } from './learner/studies'
import { StudyCard } from './learner/card'
import { StudyDetails } from './learner/details'
import { Route, Routes } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards,Pagination } from 'swiper/modules'
import { LearnerWelcomeModal } from './learner/learner-welcome-modal'
import { UnsupportedCountryModal } from './learner/unsupported-country-modal'
import { Box, Container, Flex, Divider, Group, ActionIcon, Stack, Text, TextInput, Title, ScrollArea } from '@mantine/core'
import { IconSearch, IconX, IconPlus, IconMinus, IconChevronLeft, IconChevronRight, IconChevronDown,IconCircleArrowUpFilled } from '@tabler/icons-react'
import { groupBy, orderBy, uniqBy, sortBy, filter } from 'lodash'
import { colors } from '@theme'
import { FC, useMemo, useState, useEffect } from 'react'
import StudyBanner from './studyBanner'

const HighlightedStudies: FC = () => {
    const { highlightedStudies } = useParticipantStudies()
    const isMobile = useIsMobileDevice()
    const isTablet = useIsTabletDevice()

    const scrollToStudies = () => {
        const element = document.getElementById('all-studies-unique-id')
        element?.scrollIntoView({ behavior: 'smooth' })
    }

    if (!highlightedStudies.length) return null

    return (
        <Box bg={colors.navy} py='md'>
            <Container px={{ base: 16, sm: 32 }}>
                <Stack>
                    <Group align='center' justify={isMobile? 'center' : isTablet? 'space-evenly' : 'space-between'}>
                        <CuratedStudies /> 
                        <Box w={isTablet || isMobile? '22.5rem' : '70%'}>
                            {isMobile || isTablet? <MobileStudyCards studies={highlightedStudies} /> : <DesktopStudyCards studies={highlightedStudies} />}
                        </Box>
                    </Group>
                    <Group c={colors.green} justify='center' align='center'>
                        <Stack justify='center' align='center' gap='0' style={{ cursor: 'pointer' }} onClick={()=> scrollToStudies()}>
                            <Text size='sm'>View all studies</Text>
                            <IconChevronDown size='1.5rem'/>
                        </Stack>
                    </Group>
                </Stack>
            </Container>
        </Box>
    )
}

const CuratedStudies: FC = () => {
    return (
        <Stack c={colors.white} w="15rem" ta="left" style={{ hyphens: 'auto', wordBreak: 'break-word' }}>
            <Title order={2}>Curated Studies</Title>
            <Title order={5} mt='-1.2rem'>by our learning scientists</Title>

            <Stack>
                <Text>Deepen your understanding of how you learn with expert curated scientific studies.</Text>
                <Text>Accelerate your growth and tailor your path to your own needs.</Text>
            </Stack>
        </Stack>
    )
}

const LearnerDashboard = () => {
    const env = useEnvironment()
    const { studies } = useParticipantStudies();

    if (!env.isEligible) {
        return <UnsupportedCountryModal />;
    }

    return (
        <div className='studies learner' style={{ backgroundColor: colors.ash, minHeight: '100vh' }}>
            <Routes>
                <Route path={'details/:studyId'} element={<StudyDetails />} />
            </Routes>

            <TopNavBar />
            {studies.length > 0 ? <><StudyBanner />


                <LearnerWelcomeModal />

                <HighlightedStudies />
                <StudiesContainer />
                <Footer includeFunders /></> : <LoadingAnimation />}
        </div>
    )
}

export const SearchBar: FC<{
    search: string;
    setSearch: (search: string) => void;
}> = ({ search, setSearch }) => {
    const isMobile = useIsMobileDevice();

    return (
        <TextInput
            w={isMobile ? '100%' : '600px'}
            size='md'
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            rightSection={
                search.length ? (
                    <IconX onClick={() => setSearch('')} style={{ cursor: 'pointer' }}/>
                ) : (
                    <ActionIcon variant='subtle' color={colors.text}>
                        <IconSearch size='1.1rem' stroke={1.5} />
                    </ActionIcon>
                )
            }
            placeholder='Search by study title, researcher, or topic name'
            rightSectionWidth={40}
            styles={(theme) => ({
                root: {
                    maxWidth: '400px',
                },
                input: {
                    borderRadius: '50px',
                    border: '1px solid ' + theme.colors.gray[70],
                    paddingLeft: '20px',
                    '&:focus': {
                        borderColor: theme.colors.blue[6],
                    },
                },
                rightSection: {
                    pointerEvents: 'none',
                },
            })}
        />
    )
}

export const StudiesTitle: FC<{search: string, filteredStudies: ParticipantStudy[]}> = () => {
    return (
        <Title order={2} id='all-studies-unique-id'>View All Studies</Title>
    )
}

export const SearchResults: FC<{search: string, filteredStudies: ParticipantStudy[]}> = ({ search, filteredStudies }) => {
    if (!search) {
        return null
    }

    if (filteredStudies.length == 0) {
        return (
            <Title order={4}>
                Sorry, no results found for '{search}'
            </Title>
        )
    }

    return (
        <Title order={4}>
            {filteredStudies.length} result{filteredStudies.length == 1 ? '' : 's'} for '{search}'
        </Title>
    )
}

const Circle = styled.div({
    borderRadius: '50%',
    border: `1px solid ${colors.blue}`,
    backgroundColor: colors.white,
    width: '.875rem',
    height: '.875rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

const StudyDuration: FC<{duration: Set<Number>, setDuration: Function, durationText: Number}> = ({ duration, setDuration, durationText }) => {

    const handleDurationChange = (duration:Number) => {
        setDuration((prev:Set<Number>) => {
            const newDuration = new Set<Number>(prev)
            if(newDuration.has(duration)){
                newDuration.delete(duration)
            }else{
                newDuration.add(duration)
            }
            return newDuration
        })
    }

    const [active, setActive] = useState<Boolean>(() => {
        return duration.has(durationText)
    })

    useEffect(() => {
        setActive(() => {
            return duration.has(durationText)
        })
    }, [duration, durationText])

    return (
        <Flex justify='center' align='center' gap='.5rem' 
            pt='.25rem' pb='.25rem' pl='.625rem' pr='.625rem'
            bg={ active? colors.blue: colors.white }
            style={{ border: `1px solid ${colors.blue}`, borderRadius: '50rem', transition: 'all .1s ease-in', cursor: 'pointer' }}
            onClick={() => {
                handleDurationChange(durationText)
            }}>
            <Text size='sm' c={ active? colors.white: colors.blue }>~{String(durationText)} min</Text> 
            <Circle>{active? <IconMinus size={10} color={colors.blue} stroke={3}/>: <IconPlus size={10} color={colors.blue} stroke={3}/>}</Circle>
        </Flex>
    )
}

const QuickLinks: FC<{filteredStudies: ParticipantStudy[]}> = ({ filteredStudies }) => {

    const [learningPaths, studiesByLearningPath, completedStudiesByLearningPath] = useMemo(() => {
        return [
            orderBy(
                (uniqBy(filteredStudies.map(fs => fs.learningPath), (lp) => lp?.label)),
                ['completed', 'order'],
                ['asc', 'asc']
            ),
            groupBy(filteredStudies, (study) => {
                return study.learningPath?.label
            }),
            groupBy(filter(filteredStudies, (study) => study.completedAt != null), (study) => {
                return study.learningPath?.label
            }),
        ]
    }, [filteredStudies])

    const isMobile = useIsMobileDevice()

    const scrollToLearningPath = (learningPath: string) => {
        document.getElementById(learningPath)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const [hoveredLearningPath, setHoveredLearningPath] = useState<string | null>(null)

    const handleMouseEnter = (learningPath: string) => {
        setHoveredLearningPath(learningPath)
    }

    const handleMouseLeave = () => {
        setHoveredLearningPath(null)
    }

    return (
        <Stack 
            w='25%' 
            justify='flex-start'
            pt="1rem"
            pr="2.5rem"
            gap='lg'
            display={ isMobile? 'none' : 'flex' }
        >
            {learningPaths.map(learningPath => {
                if (!learningPath) return null
                return (
                    <Group 
                        key={learningPath.label}
                        style={{ cursor: 'pointer' }}
                        c={ hoveredLearningPath === learningPath.label ? colors.blue : colors.gray70 }
                        onClick={() => scrollToLearningPath(learningPath.label)}
                        onMouseEnter={() => handleMouseEnter(learningPath.label)}
                        onMouseLeave={handleMouseLeave}
                        justify='space-between'
                    >
                        <Text>{learningPath.label}</Text>
                        <Text>
                            {completedStudiesByLearningPath[learningPath.label]? completedStudiesByLearningPath[learningPath.label].length : 0}
                        /
                            {studiesByLearningPath[learningPath.label].length}
                        </Text>
                    </Group>
                )
            })}
        </Stack>
    )
}

export const StudiesContainer = () => {
    const { search, setSearch, duration, setDuration, filteredStudies } = useSearchStudies()
    const isMobile = useIsMobileDevice()
    const isTablet = useIsTabletDevice()
    const scrollButtonRef = useRef<SVGSVGElement>(null);

    const scrollToTop = () => {
        window.scroll({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (scrollButtonRef.current) {
                if (window.scrollY > window.innerHeight * 0.25) {
                    scrollButtonRef.current.style.display = 'block';
                } else {
                    scrollButtonRef.current.style.display = 'none';
                }
            }
        };
      
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (

        
        <Container px={{ base: 16, sm: 32 }} pt='1.5rem' pos="relative">
            <IconCircleArrowUpFilled
                size='2rem'
                ref={scrollButtonRef}
                onClick={scrollToTop}
                        
                style={{
                    display: 'none',
                    position: 'fixed',
                    bottom: 20,
                    marginLeft: -60,
                    width: '30px', 
                    height: '30px',
                    color: colors.purple,
                    cursor: 'pointer',
                    filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
                }}
            />
            <Stack gap='lg'>
                <StudiesTitle search={search} filteredStudies={filteredStudies} />
                <Flex gap='xl'>
                    {!isMobile && !isTablet ? <QuickLinks filteredStudies={filteredStudies} /> : ''}
                    <Stack w={!isMobile && !isTablet? '75%' : '100%'}>
                        <Group justify='space-between' wrap='wrap' pt='.5rem' pb='0.1rem'>
                            <Flex justify='center' align='center' gap='md'>
                                <StudyDuration duration={duration} durationText={5} setDuration={setDuration}></StudyDuration>
                                <StudyDuration duration={duration} durationText={15} setDuration={setDuration}></StudyDuration>
                                <StudyDuration duration={duration} durationText={25} setDuration={setDuration}></StudyDuration>
                            </Flex>
                            <SearchBar search={search} setSearch={setSearch} />
                        </Group>

                        <SearchResults search={search} filteredStudies={filteredStudies} />
                        <Divider size={'xs'}  />

                        <StudiesByLearningPath filteredStudies={filteredStudies} />  
                    </Stack> 
                </Flex>
            </Stack>
        </Container>
    )
}

export const MobileStudyCards: FC<{studies: ParticipantStudy[]}> = ({ studies }) => {

    return (
        <Box style={{ overflow: 'hidden' }}>
            <style>
                {`
                    .swiper-pagination-bullet {
                        background-color: ${colors.blue} !important;
                    }
                    
                    .swiper-pagination-bullet-active {
                        background-color: ${colors.purple} !important;
                    }
                `}
            </style>
            <Swiper
                effect={'cards'}
                slidesPerView={'auto'}
                freeMode={true}
                cardsEffect={{
                    slideShadows: false,
                    perSlideOffset: 14,
                }}
                centeredSlides={true}
                pagination={{
                    enabled: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 5,
                }}
                modules={[EffectCards, Pagination]}
                style={{
                    paddingBottom: '2rem',
                    marginBottom: '1rem',
                }}
            >
                {studies.map(study => (
                    <SwiperSlide key={study.id} className="pb-1" style={{ paddingTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <StudyCard study={study}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}

export const DesktopStudyCards: FC<{studies: ParticipantStudy[]}> = ({ studies }) => {
    
    const [displayArrows, setDisplayArrows] = useState<boolean>(false)
    const viewport = useRef<HTMLDivElement>(null);

    const checkOverflow = () => {
        if (viewport.current) {
            const overflow = viewport.current.scrollWidth > viewport.current.clientWidth;
            return overflow
        }
        return false
    };

    return (
        <Stack justify='center' style={{ position: 'relative' }} 
            onMouseOver={() => {
                if(checkOverflow()){
                    setDisplayArrows(true)
                }
            }} onMouseLeave={() => {
                setDisplayArrows(false)
            }}>
            <ScrollArea viewportRef={viewport} type='never'>
                <Flex align='center' justify='flex-start' gap='lg' pt='1rem' pb='2rem'>

                    {studies.map(study => (
                        <StudyCard key={study.id} study={study}/>
                    ))}
                
                </Flex>
            </ScrollArea>

            <div style={{ position: 'absolute', left: -10, cursor: 'pointer', marginTop: '-1rem', display: displayArrows ? 'block' : 'none' }}
                onClick={() => {
                    if(viewport.current){
                        viewport.current.scrollBy({ left: -200, behavior: 'smooth' })
                    }
                }}>
                <IconChevronLeft color={colors.purple} size='3.5rem'></IconChevronLeft>
            </div>
            <div style={{ position: 'absolute', right: -10, cursor: 'pointer', marginTop: '-1rem', display: displayArrows ? 'block' : 'none' }}
                onClick={() => {
                    if(viewport.current){
                        viewport.current.scrollBy({ left: 200, behavior: 'smooth' })
                    }
                }}>
                <IconChevronRight color={colors.purple} size='3.5rem'></IconChevronRight>
            </div>   
        </Stack>
    )
}

export const StudiesByLearningPath: FC<{filteredStudies: ParticipantStudy[]}> = ({ filteredStudies }) => {
    const [learningPaths, studiesByLearningPath] = useMemo(() => {
        return [
            orderBy(
                (uniqBy(filteredStudies.map(fs => fs.learningPath), (lp) => lp?.label)),
                ['completed', 'order'],
                ['asc', 'asc']
            ),
            groupBy(filteredStudies, (study) => {
                return study.learningPath?.label
            }),
        ]
    }, [filteredStudies])

    const isMobile = useIsMobileDevice()

    return (
        <Stack gap='lg' data-testid='studies-listing' c={colors.text}>
            {learningPaths.map(learningPath => {
                if (!learningPath) return null
                const studies = sortBy(studiesByLearningPath[learningPath.label], (study) => !!study.completedAt)
                return (
                    <Stack 
                        w='100%'
                        key={learningPath.label}
                        id={learningPath.label}
                    >
                        <Group gap='sm'>
                            <Title order={3} c={colors.gray90}>
                                {learningPath.label}
                            </Title>
                            <Text span>|</Text>
                            <Title order={3} fw='300'>
                                {learningPath.description}
                            </Title>
                        </Group>
                        {isMobile ?
                            <MobileStudyCards studies={studies} /> :
                            <DesktopStudyCards studies={studies} />
                        }
                    </Stack>
                )
            })}
        </Stack>
    )
}


export default LearnerDashboard
