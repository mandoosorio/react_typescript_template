function Objects() {
    const vehicle: { type: string, model: string, year: number, mileage?: number } = {
        type: "Toyota",
        model: "Corolla",
        year: 2009
    };
    console.log(vehicle);

    const dog: { [index: string]: string } = {};
    dog.breed = "rottweiler";
    dog.color = "black";
    console.log(dog);

    type CarYear = number
    type CarType = string
    type CarModel = string
    type Car = {
        year: CarYear,
        type: CarType,
        model: CarModel
    }

    const carYear: CarYear = 2001
    const carType: CarType = "Toyota"
    const carModel: CarModel = "Corolla"
    const car: Car = {
        year: carYear,
        type: carType,
        model: carModel
    };
    console.log(car);

    interface Rectangle {
        height: number,
        width: number
    }
      
    interface ColoredRectangle extends Rectangle {
        color: string
    }
      
    const coloredRectangle: ColoredRectangle = {
        height: 20,
        width: 10,
        color: "red"
    };
    console.log(coloredRectangle);

    function objectAdd(): void {

    }

    return (
        <div>
            <form onSubmit={objectAdd}>
                <label>Name</label>
                <input></input>
                <label>Book</label>
                <input></input>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default Objects;