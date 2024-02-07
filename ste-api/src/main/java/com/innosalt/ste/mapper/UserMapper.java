package com.innosalt.ste.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.innosalt.ste.dto.User;
import com.innosalt.ste.dto.UserDetail;

@Mapper
public interface UserMapper {
	public UserDetail loadUserByLogin(User.SignIn paramSignInDTO);
	
	public int insertUserLoginRepo(Map<String, String> paramMap);
	
	public int deleteUserLoginRepo(String sn);
	
	public int refreshUserLoginRepo(int timeout);
	
	public Map<String, Object> loadTokenBySn(String sn); 
	
	public int updateUserLoginRepo(String sn);

	public UserDetail loadUserBySn(String sn);

	public User.MyInfo selectUserAcct(String sn);
	
	public User.MyInfoDetail selectUserDetail(String sn);

	public int checkDuplicateId(String id);

	public Map<String, String> selectUserByDi(String di);
	
	public int checkNormalId(String id);

	public String selectNextUsersn();

	public int insertUserIdentity(User.SignUp paramSignUpDTO);

	public int insertUser(User.SignUp paramSignUpDTO);

	public int insertUserAcct(User.SignUp paramSignUpDTO);
	
	public int insertUserDetail(User.SignUp paramSignUpDTO);

	public List<String> selectFavoriteSymbols(String sn);

	public int insertFavoriteSymbol(Map<String, String> paramMap);

	public int deleteFavoriteSymbol(Map<String, String> paramMap);
	
	public int insertUserLogin(Map<String, String> paramMap);
	
	public int updatePassword(User.FindPassword paramDTO);
	
	public int updateUserDetail(User.MyInfoDetail paramDTO);
	
	public void deleteUser(Map<String, Object> paramMap);
}
