import { Range } from 'react-range';

export const PriceSlider = ({ minPrice, maxPrice, range, setRange, currency }: any) => {
    return (
        <div className="mt-3">
            <label className="block text-white text-sm mb-2">
                Price Range
            </label>

            <Range
                step={1}
                min={minPrice}
                max={maxPrice}
                values={range}
                onChange={setRange}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="w-full h-1 bg-white/20 rounded relative"
                    >
                        <div
                            className="absolute h-1 bg-orange-500 rounded"
                            style={{
                                left: `${((range[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                                right: `${100 - ((range[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                            }}
                        />
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        className="w-3 h-3 bg-orange-500 rounded-full "
                    />
                )}
            />

            <div className="flex justify-between text-white text-xs mt-1.5">
                <span>{range[0]} {currency}</span>
                <span>{range[1]} {currency}</span>
            </div>
        </div>
    );
};
