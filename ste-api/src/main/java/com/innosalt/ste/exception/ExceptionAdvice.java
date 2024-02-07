package com.innosalt.ste.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@RestControllerAdvice
@Slf4j
public class ExceptionAdvice {

	@ExceptionHandler({ CustomException.class })
	protected ResponseEntity<?> customException(CustomException e) {
		ExceptionPayload payload = new ExceptionPayload(e.getExceptionCode());
		e.printStackTrace();
		log.error("CustomException", payload);
		return ResponseEntity.ok().body(payload);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
		String errorMessage = "";
		try {
			Map<String, String> errors = new HashMap<>();
			ex.getBindingResult().getAllErrors()
					.forEach(c -> errors.put(((FieldError) c).getField(), c.getDefaultMessage()));
			ObjectMapper mapper = new ObjectMapper();
			errorMessage = mapper.writeValueAsString(errors);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		ExceptionPayload payload = new ExceptionPayload(ExceptionCode.INVALID_INPUT_VALUE, errorMessage);
		return ResponseEntity.ok().body(payload);
	}

	@ExceptionHandler({ BadCredentialsException.class })
	protected ResponseEntity<?> badCredentialsException(BadCredentialsException e) {
		ExceptionPayload payload = new ExceptionPayload(ExceptionCode.NEED_AUTHENTICATION);
		e.printStackTrace();
		log.error("BadCredentialsException", payload);
		return ResponseEntity.ok().body(payload);
	}

	@ExceptionHandler({ MCAException.class })
	protected ResponseEntity<?> mCAException(MCAException e) {
		ExceptionPayload payload = new ExceptionPayload(e.getExceptionCode(),
				String.valueOf(e.getTrId()) + "|" + e.getMessage());
		e.printStackTrace();
		log.error("MCAException", payload);
		return ResponseEntity.ok().body(payload);
	}

	@ExceptionHandler({ Exception.class })
	protected ResponseEntity<?> exception(Exception e) {
		ExceptionPayload payload = new ExceptionPayload(ExceptionCode.SERVER_EXCEPTION);
		e.printStackTrace();
		log.error("Exception", payload);
		return ResponseEntity.ok().body(payload);
	}
}
