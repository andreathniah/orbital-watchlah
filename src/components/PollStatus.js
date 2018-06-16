import React from "react"
class PollStatus extends React.Component {
  state = {
    status: false
  }
  onClickAdd = () => {
    // if status is false, turn to true, else do nothihng
    const status = this.state.status ? false : true
    if (status) {
      this.setState({ status: status })
      this.props.addToPoll(this.props.index)
    }
    else {
      this.setState({ status: false })
      this.props.removeFromBox(this.props.index)
    }
  }
  render() {
    const status = this.state.status ? "Added to Poll" : "Available to Add"
    return(
      <div>
        <button onClick={this.onClickAdd}>{status}</button>
      </div>
    )
  }
}

export default PollStatus;
