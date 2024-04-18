import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface ZoomProps {
  onChange?: (level: number) => void;
  className?: string | undefined;
  initialValue?: number;
  loop?: boolean;
  start: number;
  end: number;
}

const MiniPagination: React.FC<ZoomProps> = (props: ZoomProps) => {
  const {
    onChange,
    initialValue = 1,
    start,
    end,
    loop = false,
    className,
  } = props;

  const [currentPage, setCurrentPage] = useState<number>(initialValue);

  const handlePrevious = useCallback(() => {
    setCurrentPage(currentPage => {
      let newPage = currentPage - 1;

      if (loop && newPage < start) {
        newPage = end;
      }

      onChange?.(newPage);
      return newPage;
    });
  }, [loop, start, end, onChange]);

  const handleNext = useCallback(() => {
    setCurrentPage(currentPage => {
      let newPage = currentPage + 1;

      if (loop && newPage > end) {
        newPage = start;
      }

      onChange?.(newPage);
      return newPage;
    });
  }, [loop, start, end, onChange]);

  return (
    <div
      className={`inline-flex items-center justify-center gap-2 flex-nowrap border rounded-md p-1 bg-background ${className}`}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            disabled={!loop && currentPage === start}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Previous <kbd>(←)</kbd>
        </TooltipContent>
      </Tooltip>

      <p className="text-md">{`${currentPage} / ${end}`}</p>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={!loop && currentPage === end}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Next <kbd>(→)</kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default MiniPagination;
