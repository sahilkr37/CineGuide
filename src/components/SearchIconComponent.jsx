
function SearchIconComponent() {
    return (
        <div>
            <lord-icon
                src="https://cdn.lordicon.com/iuvnsegf.json"
                trigger="loop"
                stroke="bold"
                state="loop-spin"
                colors="primary:#000000,secondary:#ebe6ef,tertiary:#e88c30,quaternary:#ffffff"
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
            ></lord-icon>
        </div>
    );
}

export default SearchIconComponent;
