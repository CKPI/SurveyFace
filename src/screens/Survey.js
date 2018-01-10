import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import MobileStepper from 'material-ui/MobileStepper';
import Typography from 'material-ui/Typography';

import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';

import { loadSurvey, changeStep } from '../actions/currentSurvey';

import labels from '../labels/uk';

const styles = theme => ({
  container: {
    width: '100%',
  },

  caption: {
    marginBottom: theme.spacing.unit,
  },

  mobileStepper: {
    backgroundColor: theme.palette.common.white,
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

    const questions = survey.questions;
    const questionsCount = questions.length;

    const question = questions[activeStep];
    let questionElement = null;

    if (question) {
      questionElement = (
        <Fragment>
          <Typography type="caption" className={classes.caption}>
            {labels.question} {activeStep + 1} {labels.from} {questionsCount}
          </Typography>

          <Typography>
            {question.question}
          </Typography>

          <MobileStepper
            type="text"
            steps={questionsCount}
            activeStep={activeStep}
            className={classes.mobileStepper}
            backButton={(
              <Button
                dense
                onClick={this.handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeftIcon />
                {labels.back}
              </Button>
            )}
            nextButton={(
              <Button
                dense
                onClick={
                  activeStep === questionsCount - 1 ?
                    this.handleFinish :
                    this.handleNext
                }
              >
                {
                  activeStep === questionsCount - 1 ?
                    labels.finish :
                    labels.next
                }
                <KeyboardArrowRightIcon />
              </Button>
            )}
          />
        </Fragment>
      );
    }

    return (
      <div className={classes.container}>
        {progress}
        {errorMessage}
        {questionElement}
      </div>
    );
  }
}

Survey.propTypes = {
  activeStep: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  survey: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  onStepChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.currentSurvey;

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
