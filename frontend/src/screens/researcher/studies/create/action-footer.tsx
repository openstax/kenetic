import { Box, React } from '@common';
import { Link } from 'react-router-dom';
import { Icon } from '@components';
import { Button } from '@nathanstitt/sundry';
import { Step } from './edit-study';

export const ActionFooter: FC<{
    step: Step,
}> = ({ step }) => {
    return (
        <Box className='sticky-bottom bg-white mt-auto' css={{ minHeight: 80, boxShadow: `0px -3px 10px rgba(219, 219, 219, 0.5)` }}>
            <Box className='container-lg' align='center' justify='between'>
                {step.backAction ? <Link to=''>
                    <Box align='center' gap='small' onClick={() => {step.backAction?.()}}>
                        <Icon icon='chevronLeft'></Icon>
                        <span>Back</span>
                    </Box>
                </Link> : <span></span>}

                <Box align='center' gap='large'>
                    {step.secondaryAction ? <Button
                        className='btn-researcher-secondary'
                        css={{ width: 170, justifyContent: 'center' }}
                        onClick={() => step.secondaryAction?.action?.()}
                    >
                        {step.secondaryAction?.text}
                    </Button> : <></>}

                    {step.primaryAction ? <Button
                        className='btn-researcher-primary'
                        css={{ width: 170, justifyContent: 'center' }}
                        onClick={() => step.primaryAction?.action?.()}
                    >
                        {step.primaryAction?.text}
                    </Button> : <></>}
                </Box>
            </Box>
        </Box>
    )
}
