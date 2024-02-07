package com.innosalt.ste.util;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class SHA256UtilTest {

	@Test
	void test() throws Exception {
		System.out.println(SHA256Util.encrypt("innosalt1", "innosalt1"+"innosalt1"));
//		System.out.println(SHA256Util.encrypt("innosalt2", "innosalt2"+"innosalt1"));
//		System.out.println(SHA256Util.encrypt("innosalt3", "innosalt3"+"innosalt1"));
//		System.out.println(SHA256Util.encrypt("innosalt4", "innosalt4"+"innosalt1"));
//		System.out.println(SHA256Util.encrypt("innosalt5", "innosalt5"+"innosalt1"));
//		System.out.println(AES256Util.encrypt("36278218301", "P000000001" + "innosalt1"));
//		System.out.println(AES256Util.encrypt("36278218401", "P000000002" + "innosalt1"));
//		System.out.println(AES256Util.encrypt("36278333101", "P000000003" + "innosalt1"));
//		System.out.println(AES256Util.encrypt("36278333102", "P000000004" + "innosalt1"));
//		System.out.println(AES256Util.encrypt("36278333103", "P000000007" + "innosalt1"));
//		System.out.println(AES256Util.encrypt("36278333104", "P000000009" + "innosalt1"));
		System.out.println(SHA256Util.encrypt("innosalt6", "innosalt6"+"innosalt1"));
	}

}
