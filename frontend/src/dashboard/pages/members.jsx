import { Component } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./css/members.css";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import Info from "../../info";

class Members extends Component {
  constructor() {
    super();
    this.state = {
      Pages: 0,
      EditMember: false,
      NewAccount: false,
      Index: 0,
      EditOrDelete: {},
      DeleteMember: false,
      data: [],
      newAccount: {},
    };
  }
  componentDidMount() {
    axios.get(Info.path + "/users", { withCredentials: true }).then((res) => {
      if (res.data.status) {
        this.setState({
          data: res.data.data,
        });
      }
    });
  }

  DeleteMember(v) {
    this.setState({
      DeleteMember: true,
      Index: v,
      EditOrDelete: this.state.data[this.state.Pages][v],
    });
  }
  UpdateMember(v) {
    this.setState({
      EditMember: true,
      Index: v,
      EditOrDelete: this.state.data[this.state.Pages][v],
    });
  }

  UpdateValue(v, t) {
    if (t === "username") {
      this.setState({
        EditOrDelete: { ...this.state.EditOrDelete, username: v },
      });
    } else if (t === "email") {
      this.setState({
        EditOrDelete: { ...this.state.EditOrDelete, email: v },
      });
    } else if (t === "password") {
      this.setState({
        EditOrDelete: { ...this.state.EditOrDelete, password: v },
      });
    } else if (t === "type") {
      this.setState({
        EditOrDelete: { ...this.state.EditOrDelete, type: v },
      });
    }
  }

  UpdateAccount() {
    axios
      .post(
        Info.path + "/update-account",
        {
          primary: this.state.data[this.state.Pages][this.state.Index].email,
          data: this.state.EditOrDelete,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
  }

  DeleteAccount() {
    axios
      .post(
        Info.path + "/delete-account",
        {
          email: this.state.EditOrDelete.email,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status) {
          window.location.reload();
        }
      });
  }

  CreateNewAccount() {
    axios
      .post(Info.path + "/new-account", this.state.newAccount, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          window.location.reload();
        }
      });
  }

  render() {
    const { data, EditOrDelete, Pages } = this.state;
    return (
      <div className="member">
        <div className="newMember">
          <span
            onClick={() => {
              this.setState({ NewAccount: true });
            }}
          >
            Create new account
          </span>
        </div>
        <div className="TableMembers">
          <div>
            <table>
              <thead>
                <tr>
                  <td>Username</td>
                  <td>Email</td>
                  <td>Password</td>
                  <td>Type account</td>
                  <td>Date Created</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {data[Pages] && Array.isArray(data[Pages]) ? (
                  data[Pages].map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{v.username}</td>
                        <td>{v.email}</td>
                        <td>{v.password}</td>
                        <td>{v.type}</td>
                        <td>{v.date}</td>
                        <td>
                          <FaRegEdit onClick={() => this.UpdateMember(i)} />
                        </td>
                        <td>
                          <MdDeleteForever
                            onClick={() => this.DeleteMember(i)}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>Not found data. </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <IoIosArrowBack
              onClick={() => {
                console.log("back");
                if (Pages <= this.state.data.length - 1 && Pages > 0) {
                  this.setState({
                    Pages: Pages - 1,
                  });
                }
              }}
            />
            <span>
              {" "}
              {Pages + 1} - {this.state.data.length}
            </span>
            <IoIosArrowForward
              onClick={() => {
                if (Pages < this.state.data.length - 1 && Pages >= 0) {
                  this.setState({
                    Pages: Pages + 1,
                  });
                }
              }}
            />
          </div>
        </div>

        <CSSTransition
          in={this.state.NewAccount}
          timeout={300}
          className={"EditMemberModal"}
          unmountOnExit
        >
          <div>
            <div>
              <h2>Create new account</h2>
              <div>
                <div>
                  <p>Username</p>
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => {
                      this.setState({
                        newAccount: {
                          ...this.state.newAccount,
                          username: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div>
                  <p>Email</p>
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                      this.setState({
                        newAccount: {
                          ...this.state.newAccount,
                          email: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div>
                  <p>Password</p>
                  <input
                    type="text"
                    placeholder="Password"
                    onChange={(e) => {
                      this.setState({
                        newAccount: {
                          ...this.state.newAccount,
                          password: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div>
                  <p>Select type Account</p>
                  <select
                    value={EditOrDelete.type}
                    onChange={(e) => {
                      this.setState({
                        newAccount: {
                          ...this.state.newAccount,
                          type: e.target.value,
                        },
                      });
                    }}
                  >
                    <option value="Member">Member</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="button"
                  value="Save"
                  onClick={() => this.CreateNewAccount()}
                />
                <input
                  type="button"
                  value="Cancel"
                  onClick={() => {
                    this.setState({
                      NewAccount: false,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          in={this.state.EditMember}
          timeout={300}
          className={"EditMemberModal"}
          unmountOnExit
        >
          <div>
            <div>
              <h2>Edit account member</h2>
              <div>
                <div>
                  <p>Username</p>
                  <input
                    type="text"
                    placeholder="Username"
                    value={EditOrDelete.username}
                    onChange={(e) => {
                      this.UpdateValue(e.target.value, "username");
                    }}
                  />
                </div>
                <div>
                  <p>Email</p>
                  <input
                    type="text"
                    placeholder="Email"
                    value={EditOrDelete.email}
                    onChange={(e) => {
                      this.UpdateValue(e.target.value, "email");
                    }}
                  />
                </div>
                <div>
                  <p>Password</p>
                  <input
                    type="text"
                    placeholder="Password"
                    value={EditOrDelete.password}
                    onChange={(e) => {
                      this.UpdateValue(e.target.value, "password");
                    }}
                  />
                </div>
                <div>
                  <p>Select type Account</p>
                  <select
                    value={EditOrDelete.type}
                    onChange={(e) => {
                      this.UpdateValue(e.target.value, "type");
                    }}
                  >
                    <option value="Member">Member</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="button"
                  value="Add"
                  onClick={() => this.UpdateAccount()}
                />
                <input
                  type="button"
                  value="Cancel"
                  onClick={() => {
                    this.setState({
                      AddMember: false,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          in={this.state.DeleteMember}
          timeout={300}
          className={"DeleteMemberModal"}
          unmountOnExit
        >
          <div>
            <div>
              <div>
                <h2>Delete account</h2>
              </div>
              <div className="TableMembers">
                <table>
                  <thead>
                    <tr>
                      <td>Username</td>
                      <td>Email</td>
                      <td>Password</td>
                      <td>Type account</td>
                      <td>Date Created</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{EditOrDelete.username}</td>
                      <td>{EditOrDelete.email}</td>
                      <td>{EditOrDelete.password}</td>
                      <td>{EditOrDelete.type}</td>
                      <td>{EditOrDelete.date}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <input
                  type="button"
                  value={"Delete"}
                  onClick={() => this.DeleteAccount()}
                />
                <input
                  type="button"
                  value={"Cancel"}
                  onClick={() => {
                    this.setState({
                      DeleteMember: false,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default Members;
