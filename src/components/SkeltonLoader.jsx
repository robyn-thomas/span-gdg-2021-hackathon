const SkeletonLoader = () => {
  return (
    <div class="shadow mt-4 rounded-md p-4 w-full mx-auto">
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 bg-gray-200 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-gray-200 rounded col-span-2"></div>
              <div class="h-2 bg-gray-200 rounded col-span-1"></div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonLoader;
