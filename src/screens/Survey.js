import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Typography from 'material-ui/Typography';

import { loadSurvey, changeStep } from '../actions/currentSurvey';

import labels from '../labels/uk';

const styles = theme => ({
  container: {
    width: '100%',
  },

  stepper: {
    marginTop: theme.spacing.unit * 3,
  },

  actions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },

  actionButton: {
    marginRight: theme.spacing.unit,
  },
});

class Survey extends Component {
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
    this.props.onLoad(this.props.match.params.id);
  }

  handleBack = () => {
    const { activeStep, onStepChange } = this.props;
    if (activeStep > 0) {
      onStepChange(activeStep - 1);
    }
  }

  handleNext = () => {
    const { activeStep, survey, onStepChange } = this.props;
    if (activeStep < survey.questions.length - 1) {
      onStepChange(activeStep + 1);
    }
  }

  handleFinish = () => {

  }

  render() {
    const { activeStep, classes, survey, isLoading, hasError } = this.props;

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

    const steps = survey.questions.map(question => (
      <Step key={question.question}>
        <StepLabel>{question.question}</StepLabel>
        <StepContent>
          <Typography>{question.type}</Typography>
          <div className={classes.actions}>
            <Button
              disabled={activeStep === 0}
              onClick={this.handleBack}
              className={classes.actionButton}
            >
              {labels.back}
            </Button>
            <Button
              onClick={
                activeStep === survey.questions.length - 1 ?
                  this.handleFinish :
                  this.handleNext
              }
              raised
              color="primary"
              className={classes.actionButton}
            >
              {
                activeStep === survey.questions.length - 1 ?
                  labels.finish :
                  labels.next
              }
            </Button>
          </div>
        </StepContent>
      </Step>
    ));

    return (
      <div className={classes.container}>
        {progress}
        {errorMessage}

        <Typography type="headline">
          {survey.title}
        </Typography>

        <Typography type="subheading">
          {this.formatter.format(Date.parse(survey.date))}
        </Typography>

        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className={classes.stepper}
        >
          {steps}
        </Stepper>
      </div>
    );
  }
}

Survey.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  survey: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  onLoad: PropTypes.func.isRequired,
  onStepChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { loading, error, survey, activeStep } = state.currentSurvey;
  return {
    isLoading: loading,
    hasError: error,
    survey,
    activeStep,
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad(id) {
    dispatch(loadSurvey(id));
  },

  onStepChange(step) {
    dispatch(changeStep(step));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Survey));
