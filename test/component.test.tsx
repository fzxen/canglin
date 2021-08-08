import React from "react";
import { connect, defineStore, useStore } from "../src";
import { fireEvent, render, screen } from "@testing-library/react";

describe("component", () => {
  const store = defineStore({
    name: "fzxen",
    family: {
      father: "fan",
      mother: "jiang",
    },
  });

  // for function component
  function ProfileFC() {
    const [user, setUser] = useStore(store.key);

    function updateFatherName() {
      setUser((user) => {
        user.family.father += " is my father!";
      });
    }

    return (
      <div>
        <p>user: {user.name}</p>
        <p>father: {user.family.father}</p>
        <p>mother: {user.family.mother}</p>
        <button onClick={updateFatherName}>change</button>
      </div>
    );
  }

  test("function component", () => {
    render(<ProfileFC />);

    expect(screen.queryByText("father: fan")).not.toBeNull();

    fireEvent.click(screen.getByText("change"));

    expect(screen.queryByText("father: fan is my father!")).not.toBeNull();
  });

  // for class component
  interface ProfileCCProps {
    name: string;
    family: {
      father: string;
      mother: string;
    };
    customStr: string;

    updateFatherName(): void;
  }
  class ProfileCC extends React.Component<ProfileCCProps> {
    updateFatherName() {
      this.props.updateFatherName();
    }

    render() {
      const { family, customStr } = this.props;

      this.updateFatherName = this.updateFatherName.bind(this);

      return (
        <div>
          <p>customStr: {customStr}</p>
          <p>father: {family.father}</p>
          <p>mother: {family.mother}</p>
          <button onClick={this.updateFatherName}>change</button>
        </div>
      );
    }
  }
  const ProfileCCWrap = connect(store.key, (user, setUser) => {
    return {
      name: user.name,
      family: user.family,
      updateFatherName() {
        setUser((user) => {
          user.family.father += "!!";
        });
      },
    };
  })(ProfileCC);

  test("class component", () => {
    render(<ProfileCCWrap customStr="this is a custom text" />);

    expect(
      screen.queryByText("customStr: this is a custom text")
    ).not.toBeNull();

    fireEvent.click(screen.getByText("change"));

    expect(screen.queryByText("father: fan is my father!!!")).not.toBeNull();
  });
});
