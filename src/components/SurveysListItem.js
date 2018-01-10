import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemText } from 'material-ui/List';

import PollIcon from 'material-ui-icons/Poll';

class SurveysListItem extends Component {
  handleClick = () => {
    const { id, onClick } = this.props;
    onClick(id);
  }

  render() {
    const { title, date, formatter } = this.props;

    return (
      <ListItem
        button
        onClick={this.handleClick}
      >
        <Avatar><PollIcon /></Avatar>
        <ListItemText
          primary={title}
          secondary={formatter.format(Date.parse(date))}
        />
      </ListItem>
    );
  }
}

SurveysListItem.propTypes = {
  date: PropTypes.string.isRequired,
  formatter: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SurveysListItem;
