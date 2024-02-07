package com.innosalt.ste.service;

import org.springframework.stereotype.Service;

import com.innosalt.ste.dto.CodeDTO;
import com.innosalt.ste.dto.LogDTO;
import com.innosalt.ste.mapper.CodeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CodeService {
	private final CodeMapper codeMapper;

	public CodeDTO selectCode() {
		return codeMapper.selectCode();
	}

	public int insertLog(LogDTO dto) {
		return codeMapper.insertLog(dto);
	}

}
