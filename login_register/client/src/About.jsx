import React from "react";

const App = () => {
  const pageStyles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      color: "#333",
      textAlign: "center",
    },
    content: {
      marginTop: "20px",
      lineHeight: "1.6",
      fontSize: "16px",
      color: "#666",
    },
    highlight: {
      color: "#0056b3",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.header}>About Study Buddy Finder</h1>
      <div style={pageStyles.content}>
        <p>
          Hello! Welcome to{" "}
          <span style={pageStyles.highlight}>Study Buddy Finder</span>, a
          platform dedicated to helping students like you find the perfect study
          partner for your academic journey.
        </p>
        <p>
          Our mission is to connect students from around the world to enhance
          collaborative learning and foster educational support through peer
          interaction. Whether you are preparing for exams, tackling complex
          projects, or simply seeking a motivational study group, you've come to
          the right place.
        </p>
        <p>
          Founded by [Your Name] in [Year], Study Buddy Finder has grown from a
          small idea into a thriving community of learners. Our platform allows
          you to connect with peers who have similar academic interests and
          schedules.
        </p>
        <p>
          Ready to join our community? Simply{" "}
          <a href="/login" style={pageStyles.link}>
            log in
          </a>{" "}
          or{" "}
          <a href="/register" style={pageStyles.link}>
            register
          </a>{" "}
          to start finding your study buddies today.
        </p>
        <a href="/all-user" style={pageStyles.link}>
          show everyone
        </a>
      </div>
    </div>
  );
};

export default App;
