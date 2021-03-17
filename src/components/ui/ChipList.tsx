import Chip, { ChipProps } from "@material-ui/core/Chip";

export interface IChipListProps {
    data: string[];
    max?: number;
    ChipProps?: ChipProps;
}

const ChipList: React.FC<IChipListProps> = ({
    data,
    max = Number.MAX_SAFE_INTEGER,
    ChipProps,
}) => {
    return (
        <>
            {data.slice(0, max).map((chip) => (
                <Chip key={chip} label={chip} color="primary" {...ChipProps} />
            ))}
            {data.length > max ? (
                <Chip
                    label={`${data.length - max} More`}
                    color="primary"
                    variant="outlined"
                />
            ) : null}
        </>
    );
};

export default ChipList;
