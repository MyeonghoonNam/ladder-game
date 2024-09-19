interface PlayerCountProps {
  count: number;
  onDecrementButtonClick: () => void;
  onIncrementButtonClick: () => void;
}

const PlayerCounter = ({ count, onDecrementButtonClick, onIncrementButtonClick }: PlayerCountProps) => {
  return (
    <div>
      {count > 2 && (
        <button type="button" onClick={onDecrementButtonClick}>
          -
        </button>
      )}

      <span>{count}</span>

      {count < 10 && (
        <button type="button" onClick={onIncrementButtonClick}>
          +
        </button>
      )}
    </div>
  );
};

export default PlayerCounter;
