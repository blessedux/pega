export function LoadingSkeleton() {
    return (
      <div className="space-y-3 sm:space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="dao-card rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1">
                  {/* Avatar skeleton */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--dework-border)] flex-shrink-0"></div>
  
                  {/* Content skeleton */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="h-5 sm:h-6 bg-[var(--dework-border)] rounded w-2/3"></div>
                    <div className="h-4 bg-[var(--dework-border)] rounded w-full"></div>
                    <div className="h-4 bg-[var(--dework-border)] rounded w-1/2 sm:hidden"></div>
                  </div>
                </div>
  
                {/* Members count skeleton */}
                <div className="flex items-center space-x-2 self-start sm:self-center">
                  <div className="w-4 h-4 bg-[var(--dework-border)] rounded"></div>
                  <div className="h-4 bg-[var(--dework-border)] rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  