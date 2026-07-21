function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="break-words text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-500 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          {action}
        </div>
      )}
    </div>
  );
}

export default PageHeader;