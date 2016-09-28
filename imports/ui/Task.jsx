import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    this.render();
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  showFormattedTime(date)
  {
    if(typeof date == 'undefined')
        return '';

    var text = "";

    text += date.getDate();
    text += "/";
    text += date.getMonth();
    text += " ";
    text += date.getHours();
    text += ":";
    text += date.getMinutes();
    text += ":";
    text += date.getSeconds();

    return text;
  }

  render() {
    return (
      <div className="row col-md-12">
        <input
          type="checkbox"
          className="col-md-1"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />

    <h4 className="text tekst col-md-3">{this.props.task.text}</h4>
        <h4 className="text tekst1 col-md-3">Startede: {this.showFormattedTime(this.props.task.createdAt)}</h4>
        <h4 className="text tekst2 col-md-3">{this.props.task.finishedAt ? "Sluttede:" : ""} {this.showFormattedTime(this.props.task.finishedAt)}</h4>

        <div className="btn btn-danger pull-right col-md-1" onClick={this.deleteThisTask.bind(this)}>
          Slet
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
