import { Button } from '@components';
import { cx, React } from '@common';

interface ResearcherButtonProps {
    type?: 'primary' | 'secondary'
    disabled?: boolean
    onClick: () => void
    className?: string
    fixedWidth?: boolean
    testId?: string
}

export const ResearcherButton: FCWC<ResearcherButtonProps> = ({
    type = 'primary',
    disabled = false,
    onClick,
    className,
    children,
    fixedWidth = false,
    testId,
}) => {
    return (
        <Button
            className={cx(className, `btn-researcher-${type}`)}
            data-testid={testId || `${type}-action`}
            disabled={disabled}
            css={{ width: fixedWidth ? 170 : 'auto', justifyContent: 'center' }}
            onClick={() => onClick()}
        >
            {children}
        </Button>
    )
}
