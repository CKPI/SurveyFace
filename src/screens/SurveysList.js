import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import { CircularProgress } from 'material-ui/Progress';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';

import SurveysListItem from '../components/SurveysListItem';

import { loadSurveysList } from '../actions/surveys';

import labels from '../labels/uk';

const styles = {
  container: {
    width: '100%',
  },
};

class SurveysList extends Component {
  constructor(...args) {
    super(...args);

    this.formatter = new Intl.DateTimeFormat('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  componentDidMount() {
    this.props.onLoad();
  }

  handleSurveyClick = (id) => {
    this.props.history.push(`/survey/${id}`);
  }

  render() {
    const { classes, surveys, isLoading, hasError } = this.props;

    const listItems = surveys.map(survey => (
      <SurveysListItem
        key={survey.id}
        id={survey.id}
        date={survey.date}
        formatter={this.formatter}
        onClick={this.handleSurveyClick}
        title={survey.title}
      />
    ));

    let progress = null;
    let errorMessage = null;

    if (isLoading) {
      progress = (
        <CircularProgress />
      );
    }

    if (hasError) {
      errorMessage = (
        <Typography color="error">
          {labels.loadingFailed}
        </Typography>
      );
    }

    return (
      <div className={classes.container}>
        {progress}
        {errorMessage}
        <List>
          {listItems}
        </List>
      </div>
    );
  }
}

SurveysList.propTypes = {
  classes: PropTypes.object.isRequired,
  hasError: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  surveys: PropTypes.array.isRequired,
  onLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { loading, error, surveys } = state.surveys;
  return {
    isLoading: loading,
    hasError: error,
    surveys,
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad() {
    dispatch(loadSurveysList());
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SurveysList)));
