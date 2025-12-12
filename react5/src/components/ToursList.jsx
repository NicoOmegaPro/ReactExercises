import Tour from "/src/components/Tour.jsx"

export default function ToursList({ tours, removeTour }){
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <section className="grid-tours">
        {tours.map(tour => (
          <Tour key={tour.id}
            {...tour}
            removeTour={removeTour}/>
        ))}
      </section>
    </section>
  );
}