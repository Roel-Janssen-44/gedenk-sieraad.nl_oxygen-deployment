export default function Video() {
  return (
    <div className="py-14">
      <div className="container">
        <div className="p-4">
          <h2 className="text-4xl text-center text-gray-800 mb-4 sm:mb-6 lg:mb-8 font-medium">
            Het proces...
          </h2>

          <div className="video-responsive">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/T6I1nAT9OHM`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Proces video"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
