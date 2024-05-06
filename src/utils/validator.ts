import * as yup from "yup";
import { isError, InternalServerError } from "@pontalti/utils/errors"
import { isFilled } from "@pontalti/utils/helper";

const validatorConfig = {
  strict: false,
  abortEarly: false,
  stripUnknown: false
}

const isRequired = (presence) => {
  return presence === 'required'
}

const custom = (...validators) => {
  validators.forEach((validate) => {
    yup.addMethod(yup.mixed, validate.name, function () {

      return this.test(function (value) {
        const {path, createError} = this

        if (!isFilled(value)) {
          if (isRequired(this.schema.spec.presence)) {
            return createError({path, message: 'is a required field for validation'})
          }
          return true
        }

        return validate(value, this.parent)
          .then(error => {
            if (isError(error)) {
              const {path, createError} = this
              return createError({path, message: error.message})
            }
            return true
          })
          .catch(e => {
            throw new InternalServerError('could not validate request', e)
          })
      })
    })
  })
}

const validate = (schema) => async (req, res, next) => {
  let parameters = {
    body: req.body,
    params: req.params,
    query: req.query
  }

  schema.validate(parameters, validatorConfig)
    .then(sanitized => {
      req.body = sanitized.body
      req.params = sanitized.params
      req.query = sanitized.query
      return next()
    })
    .catch(e => {
      return next(e)
    })
}

export {
  validatorConfig,
  custom,
  validate,
}
