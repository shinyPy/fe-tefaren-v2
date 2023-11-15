import React, { Component } from "react";

class Captcha extends Component {
  constructor() {
    super();
    this.state = {
      number1: Math.floor(Math.random() * 10),
      number2: Math.floor(Math.random() * 10),
      answer: "",
      correct: false,
    };
  }

  handleChange = (e) => {
    this.setState({ answer: e.target.value });
  };

  checkAnswer = () => {
    const { number1, number2, answer } = this.state;
    if (parseInt(answer, 10) === number1 + number2) {
      this.setState({ correct: true });
    } else {
      this.setState({ correct: false });
    }
  };

  render() {
    const { number1, number2, correct } = this.state;
    return (
      <div>
        <p>
          Masukkan hasil {number1} + {number2}:
        </p>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.checkAnswer}>Cek</button>
        {correct && <p>Jawaban benar!</p>}
      </div>
    );
  }
}

export default Captcha;
