import { Range } from 'react-range';

interface PriceSliderProps {
  minPrice: number;
  maxPrice: number;
  range: number[];
  setRange: (values: number[]) => void;
}

export const PriceSlider = ({
  minPrice,
  maxPrice,
  range,
  setRange,
}: PriceSliderProps) => {
  return (
    <div className="mt-3">
      <Range
        step={1}
        min={minPrice}
        max={maxPrice}
        values={range}
        onChange={setRange}
        renderTrack={({ props, children }) => {
          const { key, ...restProps } = props;

          return (
            <div
              key={key}
              {...restProps}
              className="w-full h-1 bg-white/20 rounded relative"
            >
              <div
                className="absolute h-1 bg-orange-500 rounded"
                style={{
                  left: `${((range[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                  right: `${100 -
                    ((range[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                }}
              />
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...restProps } = props;

          return (
            <div
              key={key}
              {...restProps}
              className="w-3 h-3 bg-orange-500 rounded-full"
            />
          );
        }}
      />
    </div>
  );
};
