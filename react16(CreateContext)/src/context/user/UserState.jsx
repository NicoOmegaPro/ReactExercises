import UserContext from "./UserContext";

export default function UserState(props) {

    const user = {
        id: 1,
        name: "Antoni Morey",
        rol: "ADMIN",
        language: "en"
    };
    
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}