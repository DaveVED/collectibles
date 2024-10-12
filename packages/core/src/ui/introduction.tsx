export const Introduction = (): JSX.Element => {
  return (
    <div className="ui-max-w-lg sm:ui-max-w-2xl lg:ui-max-w-4xl ui-mx-auto ui-text-center ui-mb-6 ui-px-4 lg:ui-px-12">
      <p className="ui-text-sm sm:ui-text-base lg:ui-text-lg ui-text-gray-700 dark:ui-text-gray-300">
        Welcome to the{" "}
        <span className="ui-font-semibold ui-text-primary dark:ui-text-primary-dark">
          TCG Price Guide
        </span>
        . Finding your card’s value is simple. Just select your card’s category,
        enter the card number, and hit search!
      </p>
    </div>
  );
};
