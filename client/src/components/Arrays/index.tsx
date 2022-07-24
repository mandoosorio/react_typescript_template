function Arrays() {
    const names: string[] = [];
    names.push("mando");

    const nums: number[] = [];
    nums.push(3);

    const books: readonly string[] = ["harry potter"];
    console.log(books);

    function arrayPush(): void {

    }

    return (
        <div>
            <form onSubmit={arrayPush}>
                <label>Name</label>
                <input></input>
                <label>Book</label>
                <input></input>
                <button type="submit">Push</button>
            </form>
        </div>
    )
}

export default Arrays;