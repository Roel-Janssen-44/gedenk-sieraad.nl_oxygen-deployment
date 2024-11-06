import {Button} from '~/components/chadcn/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/chadcn/Tooltip';

export default function InputImageSwatchLarge({
  value,
  onChange,
  title,
  options,
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {options.map((option) => (
          <TooltipProvider delayDuration={400} key={title + '-' + option.value}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() => onChange(option.value)}
                  variant="outlined"
                  size="large"
                  className={`border-2 p-1 rounded ${
                    value == option.value
                      ? 'border-black hover:border-black text-black hover:text-black'
                      : 'border-gray-300 text-black hover:border-gray-600 hover:text-black'
                  } lowercase p-0`}
                >
                  <div
                    className={`border-2 p-1 rounded relative ${
                      value == option.value
                        ? 'border-black hover:border-black text-black hover:text-black'
                        : 'border-gray-300 text-black hover:border-gray-600 hover:text-black'
                    } lowercase p-0`}
                  >
                    <img
                      src={option.image.url}
                      width={120}
                      height={60}
                      alt={option.image.altText}
                      priority={false}
                      loading="lazy"
                      loading="lazy"
                    />
                  </div>
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>{option.value}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
