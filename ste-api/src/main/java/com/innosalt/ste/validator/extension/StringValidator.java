package com.innosalt.ste.validator.extension;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class StringValidator implements ConstraintValidator<StringValid, String> {

	private List<String> valueList;
	private StringValid stringValid;

	@Override
	public void initialize(StringValid constraintAnnotation) {
		valueList = new ArrayList<>();
		valueList.addAll(List.of(constraintAnnotation.acceptedList()));
		this.stringValid = constraintAnnotation;
	}

	@Override
	public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
		boolean ignoreLetterCase = stringValid.ignoreLetterCase();

		if (ignoreLetterCase) {
			for (String value : valueList) {
				if (value.equalsIgnoreCase(s))
					return true;
			}
			return false;
		} else {
			return valueList.contains(s);
		}
	}
}