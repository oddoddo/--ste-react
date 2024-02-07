package com.innosalt.ste.config;

import java.io.IOException;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

@Configuration
public class MyBatisConfig
{
  @Autowired
  ApplicationContext applicationContext;
  
  public MyBatisConfig() {}
  
  @Bean
  public SqlSessionFactoryBean sqlSessionFactory(DataSource dataSource) throws IOException
  {
    SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
    factoryBean.setDataSource(dataSource);
    
    factoryBean.setConfigLocation(applicationContext.getResource("classpath:/mybatis/mybatis-config.xml"));
    factoryBean.setMapperLocations(applicationContext.getResources("classpath:/mybatis/mapper/*.xml"));
    return factoryBean;
  }
  
  @Bean
  public SqlSessionTemplate sqlSession(SqlSessionFactory sqlSessionFactory) {
    return new SqlSessionTemplate(sqlSessionFactory);
  }
  
  @Bean
  public DataSourceTransactionManager txManager(DataSource dataSource) {
    return new DataSourceTransactionManager(dataSource);
  }
}