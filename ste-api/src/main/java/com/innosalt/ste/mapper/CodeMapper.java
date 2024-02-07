package com.innosalt.ste.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.innosalt.ste.dto.CodeDTO;
import com.innosalt.ste.dto.LogDTO;

@Mapper
public interface CodeMapper {
  public CodeDTO selectCode();
  public int insertLog(LogDTO paramDTO);
}
