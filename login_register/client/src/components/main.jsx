import React, { useState } from "react";

function content() {
  return (
    <div className="main-content">
        <header>
            <h2>Welcome Back, User!</h2>
        </header>
        <section className="profile" id="profile">
            <h3>Profile</h3>
            <p>Profile details and settings...</p>
        </section>
        <section className="match" id="match">
            <h3>Start Matching</h3>
            <p>Matching interface...</p>
        </section>
    </div>
  );
}

export default content;
