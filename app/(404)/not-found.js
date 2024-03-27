export default function NotFound() {
  return (
    <main>
      <div className="mx-auto px-4 flex items-center justify-start px-8 mt-6">
        <div className="max-w-lg mx-auto text-center">
          <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
            Page not found
          </h3>
          <p className="text-gray-600 mt-3">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
        </div>
      </div>
    </main>
  );
}