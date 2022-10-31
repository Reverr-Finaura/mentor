import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatComponent.module.css";
import add from "../../assets/img/add.png";
import options from "../../assets/img/options.png";
import attachment from "../../assets/img/attachment.png";
import emoji from "../../assets/img/emoji.png";
import EmojiPicker from "emoji-picker-react";
import {
  addMsgsInMentorDatabase,
  getUserFromDatabase,
  updateMsgsInMentorDatabase,
  uploadMedia,
  getMentorMsgs,
  updateMsgsInClientDatabase,
  addMsgsInClientDatabase,
} from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";

const ChatComponent = () => {
  const [clients, setClients] = useState([]);
  const [clientZero, setClientZero] = useState("");
  const [mentorMsgs, setMentorMsgs] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);

  const [selectedClient, setSelectedClient] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const msgEndRef = useRef();

  const [newMsg, setNewMsg] = useState([]);
  const mentorEmail = "jatin.dsquare@gmail.com";

  // console.log("Clients - ", clients);
  // console.log("Mentor Messages- ", mentorMsgs);
  // console.log(selectedClient);

  const fetchClients = async () => {
    setClientsLoading(true);
    let result = await getUserFromDatabase(mentorEmail);
    if (result !== null || undefined) {
      const results = [];
      for (let i = 0; i < result.clients.length; i++) {
        let res = await getUserFromDatabase(result.clients[i]);
        results.push(res);
      }
      setClients(results);
      setClientZero(results[0]);
      setClientsLoading(false);
    }
  };

  const fetchMentorMsgs = async () => {
    let results = await getMentorMsgs(mentorEmail);

    if (results.messages?.length !== mentorMsgs.messages?.length) {
      setMentorMsgs(results);
    } else if (mentorMsgs.length === 0) {
      setMentorMsgs(results);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchMentorMsgs();
  }, []);

  const sendMsg = async () => {
    // FOR SENDING FILE

    if (file) {
      console.log("FILE_SELECTED");
      console.log("FILE :", file);
      setIsLoading(true);

      let fileUrl = await uploadMedia(file, "Messages");
      var curClientData;

      if (selectedClient.messages === null) {
        curClientData = {
          ...selectedClient,
          messages: [
            {
              createdAt: new Date(),
              msg: fileUrl,
              sendBy: mentorEmail,
              type: file.type,
            },
          ],
        };
      } else {
        curClientData = {
          ...selectedClient,
          messages: [
            ...selectedClient.messages,
            {
              createdAt: new Date(),
              msg: fileUrl,
              sendBy: mentorEmail,
              type: file.type,
            },
          ],
        };
      }
      setSelectedClient(curClientData);
      setIsLoading(false);

      var isExist;
      for (let i = 0; i < mentorMsgs.length; i++) {
        if (mentorMsgs[i].email == selectedClient.email) {
          isExist = true;
          break;
        } else {
          isExist = false;
        }
      }
      if (isExist) {
        setMentorMsgs(
          mentorMsgs.map((data) => {
            if (data.email == selectedClient.email) {
              return data, curClientData;
            } else {
              return data;
            }
          })
        );
        await updateMsgsInMentorDatabase(mentorEmail, selectedClient.email, {
          messages: curClientData.messages,
        });
        await updateMsgsInClientDatabase(selectedClient.email, mentorEmail, {
          messages: curClientData.messages,
        });
      } else {
        setMentorMsgs([...mentorMsgs, curClientData]);
        await addMsgsInMentorDatabase(mentorEmail, selectedClient.email, {
          messages: curClientData.messages,
        });
        await addMsgsInClientDatabase(selectedClient.email, mentorEmail, {
          messages: curClientData.messages,
        });
      }
      setFile(null);
    } else {
      if (newMsg) {
        var curClientData;

        if (selectedClient.messages === null) {
          curClientData = {
            ...selectedClient,
            messages: [
              {
                createdAt: new Date(),
                msg: newMsg,
                sendBy: mentorEmail,
                type: "text",
              },
            ],
          };
        } else {
          curClientData = {
            ...selectedClient,
            messages: [
              ...selectedClient.messages,
              {
                createdAt: new Date(),
                msg: newMsg,
                sendBy: mentorEmail,
                type: "text",
              },
            ],
          };
        }
        setSelectedClient(curClientData);
        var isExist;
        for (let i = 0; i < mentorMsgs.length; i++) {
          if (mentorMsgs[i].email == selectedClient.email) {
            isExist = true;
            break;
          } else {
            isExist = false;
          }
        }
        if (isExist) {
          setMentorMsgs(
            mentorMsgs.map((data) => {
              if (data.email == selectedClient.email) {
                return data, curClientData;
              } else {
                return data;
              }
            })
          );
          await updateMsgsInMentorDatabase(mentorEmail, selectedClient.email, {
            messages: curClientData.messages,
          });
          await updateMsgsInClientDatabase(selectedClient.email, mentorEmail, {
            messages: curClientData.messages,
          });
        } else {
          setMentorMsgs([...mentorMsgs, curClientData]);
          await addMsgsInMentorDatabase(mentorEmail, selectedClient.email, {
            messages: curClientData.messages,
          });
          await addMsgsInClientDatabase(selectedClient.email, mentorEmail, {
            messages: curClientData.messages,
          });
        }
        setNewMsg("");
      }
    }
  };

  const onEmojiClickHandler = (emojiObj) => {
    setNewMsg((prevInput) => prevInput + emojiObj.emoji);
    setShowEmojiPicker(false);
  };
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [selectedClient]);

  useEffect(() => {
    var isEmailExist = false;
    for (let i = 0; i < mentorMsgs.length; i++) {
      if (mentorMsgs[i].email == clientZero.email) {
        isEmailExist = true;
        break;
      } else {
        isEmailExist = false;
      }
    }

    if (isEmailExist) {
      const messages = [];
      mentorMsgs.forEach((data) => {
        if (data.email == clientZero.email) {
          messages.push(...data.messages);
        }
      });

      messages.sort((a, b) => {
        const dateA = a.createdAt;
        const dateB = b.createdAt;
        if (dateA > dateB) return 1;
        else if (dateA < dateB) return -1;
        return 0;
      });

      setSelectedClient({
        image: clientZero.image,
        name: clientZero.name,
        email: clientZero.email,
        messages: messages,
      });
    } else {
      setSelectedClient({
        image: clientZero.image,
        name: clientZero.name,
        email: clientZero.email,
        messages: null,
      });
    }
  }, [clientZero]);

  return (
    <>
      <div className={styles.chat}>
        <div className={styles["users-section"]}>
          <div className={styles["top-bar-users"]}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
              alt="profile"
              className={styles["mentor-profile"]}
            />
          </div>
          <div className={styles["user-profiles"]}>
            {clientsLoading ? (
              <div className={styles.loader}></div>
            ) : (
              clients.map((client, index) => (
                <div
                  key={index}
                  onClick={() => {
                    var isEmailExist = false;
                    for (let i = 0; i < mentorMsgs.length; i++) {
                      if (mentorMsgs[i].email == client.email) {
                        isEmailExist = true;
                        break;
                      } else {
                        isEmailExist = false;
                      }
                    }

                    if (isEmailExist) {
                      const messages = [];
                      mentorMsgs.forEach((data) => {
                        if (data.email == client.email) {
                          messages.push(...data.messages);
                        }
                      });

                      messages.sort((a, b) => {
                        const dateA = a.createdAt;
                        const dateB = b.createdAt;
                        if (dateA > dateB) return 1;
                        else if (dateA < dateB) return -1;
                        return 0;
                      });

                      setSelectedClient({
                        image: client.image,
                        name: client.name,
                        email: client.email,
                        messages: messages,
                      });
                    } else {
                      setSelectedClient({
                        image: client.image,
                        name: client.name,
                        email: client.email,
                        messages: null,
                      });
                    }
                  }}
                >
                  {client.name}
                </div>
              ))
            )}
          </div>
        </div>
        <div className={styles["chat-section"]}>
          <div className={styles["top-bar"]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {selectedClient.length === 0 ? null : (
                <img
                  src={selectedClient.image}
                  alt="profile"
                  className={styles.profile}
                />
              )}
              {selectedClient ? <h3>{selectedClient.name}</h3> : null}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={add} alt="add" className={styles.add} />
              <img src={options} alt="add" className={styles.options} />
            </div>
          </div>

          <div className={styles["chat-area"]} id="chat-area">
            {selectedClient?.messages ? (
              selectedClient.messages.map((curMsg) => {
                if (curMsg.type == "text") {
                  return (
                    <>
                      <h4
                        className={
                          curMsg.sendBy == mentorEmail
                            ? styles["mentor-h4"]
                            : styles["client-h4"]
                        }
                      >
                        {curMsg?.msg}
                      </h4>
                    </>
                  );
                } else if (
                  curMsg.type == "image/jpeg" ||
                  curMsg.type == "image/png"
                ) {
                  return (
                    <>
                      <a
                        href={curMsg.msg}
                        target="_blank"
                        rel="noreferrer"
                        className={
                          curMsg.sendBy == mentorEmail
                            ? styles["mentor-img"]
                            : styles["client-img"]
                        }
                      >
                        <img
                          src={curMsg.msg}
                          alt="img"
                          style={{
                            width: "150px",
                            border: "2px solid #b9ceef",
                            borderRadius: "10px",
                          }}
                        />
                      </a>
                    </>
                  );
                } else {
                  return (
                    <a
                      href={curMsg.msg}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        curMsg.sendBy == mentorEmail
                          ? styles["mentor-img"]
                          : styles["client-img"]
                      }
                    >
                      <img
                        src="/images/doc.png"
                        alt="doc"
                        style={{
                          width: "150px",
                          border: "2px solid transparent",
                          borderRadius: "10px",
                        }}
                      />
                    </a>
                  );
                }
              })
            ) : selectedClient?.messages === null ? (
              <h3 style={{ color: "grey", textAlign: "center" }}>
                No Conversation yet!
              </h3>
            ) : null}

            <div ref={msgEndRef}></div>
            {isLoading ? (
              <h5
                style={{ position: "absolute", right: "2rem", bottom: "15%" }}
              >
                SENDING FILE...
              </h5>
            ) : null}
          </div>

          <div className={styles["bottom-bar"]}>
            <label htmlFor="file">
              <img
                src={attachment}
                alt="attachment"
                className={styles.attachment}
                style={
                  selectedClient.length === 0 ? { cursor: "no-drop" } : null
                }
              />
            </label>
            <input
              onInput={(e) => {
                setFile(e.target.files[0]);
                toast.success('File selected, press "Enter ↩" to send');
              }}
              type="file"
              id="file"
              style={{ display: "none" }}
              disabled={selectedClient.length === 0 ? true : false}
            />
            <img
              src={emoji}
              alt="emoji"
              className={styles.emoji}
              onClick={() => {
                if (selectedClient.length === 0) {
                  return;
                }
                setShowEmojiPicker(!showEmojiPicker);
              }}
              style={selectedClient.length === 0 ? { cursor: "no-drop" } : null}
            />
            <input
              value={newMsg}
              type="text"
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  if (file === null) {
                    if (!newMsg.replace(/\s/g, "").length) {
                      toast.error("Enter atleast one character");
                      return;
                    }
                  }
                  sendMsg();
                }
              }}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Message"
              className={styles["message-input"]}
              disabled={selectedClient.length === 0 ? true : false}
              style={selectedClient.length === 0 ? { cursor: "no-drop" } : null}
            />
          </div>
        </div>
      </div>
      {showEmojiPicker && (
        <div className={styles["emoji-picker"]}>
          <EmojiPicker onEmojiClick={onEmojiClickHandler} width={300} />
        </div>
      )}
      <Toaster />
    </>
  );
};

export default ChatComponent;
