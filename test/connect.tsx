// import React from "react";
// import { connect, defineStore, StoreKey } from "../src";

// const USER: StoreKey<{
//   name: string;
//   hobby: string[];
// }> = Symbol();
// defineStore(USER, {
//   name: "fzxen",
//   hobby: ["basketball"],
// });

// interface ProfileProps {
//   name: string;
//   hobby: string[];
//   age: number;
// }
// class Profile extends React.Component<ProfileProps> {}

// const connector = connect(USER, (state, setState) => {
//   return {
//     name: state.name,
//     hobby: state.hobby,
//   };
// });

// const Wrapper = connector(Profile);

// function Test() {
//   return <Wrapper age={10} />;
// }
