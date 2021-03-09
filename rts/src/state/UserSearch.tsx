import { useState } from "react";

const users = [
  { name: "Sarah", age: 20 },
  { name: "Snake", age: 21 },
  { name: "Hummer", age: 22 },
];

const UserSearch: React.FC = () => {
  // Set state
  const [name, setName] = useState("");
  const [user, setUser] = useState<{ name: string; age: number } | undefined>();

  // Action on click input
  const onClick = () => {
    // Logic to find a user from input
    const foundUser = users.find((user) => {
      return user.name === name;
    });

    // console.log(foundUser);
    setUser(foundUser);
  };

  return (
    <div>
      User Search
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={onClick}>Find User</button>
      <div>
        {user && user.name} :: {user && user.age}
      </div>
    </div>
  );
};

export default UserSearch;
