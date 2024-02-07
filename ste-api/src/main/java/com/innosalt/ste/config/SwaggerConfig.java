package com.innosalt.ste.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.fasterxml.classmate.TypeResolver;
import com.innosalt.ste.exception.ExceptionPayload;
import com.innosalt.ste.model.DataPayload;

import io.swagger.v3.oas.models.security.SecurityScheme;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.HttpAuthenticationScheme;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
@Profile({ "!prod" })
public class SwaggerConfig {
	private static final String REFERENCE = "Bearer 토큰 값";

	@Bean
	public Docket api(TypeResolver typeResolver) {
		return (new Docket(DocumentationType.OAS_30))
				.securityContexts(Arrays.asList(new SecurityContext[] { securityContext() }))
//				.securitySchemes(Arrays.asList(new SecurityScheme[] { (SecurityScheme) apiKey() }))
				.securitySchemes(Arrays.asList(bearerAuthSecurityScheme()))
				.additionalModels(typeResolver.resolve(DataPayload.class, new java.lang.reflect.Type[0]),
						new com.fasterxml.classmate.ResolvedType[0])
				.additionalModels(typeResolver.resolve(ExceptionPayload.class, new java.lang.reflect.Type[0]),
						new com.fasterxml.classmate.ResolvedType[0])
				.useDefaultResponseMessages(false).ignoredParameterTypes(AuthenticationPrincipal.class).select()
				.apis(RequestHandlerSelectors.basePackage("com.innosalt.ste.controller")).paths(PathSelectors.any())
				.build().apiInfo(apiInfo());
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder().securityReferences(defaultAuth()).build();
	}

	private List<SecurityReference> defaultAuth() {
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
		authorizationScopes[0] = authorizationScope;
		return Arrays.asList(new SecurityReference[] { new SecurityReference(REFERENCE, authorizationScopes) });
	}

	private HttpAuthenticationScheme bearerAuthSecurityScheme() {
		return HttpAuthenticationScheme.JWT_BEARER_BUILDER.name(REFERENCE).build();
	}

	private ApiKey apiKey() {
		return new ApiKey("Authorization", "Authorization", "header");
	}

	private ApiInfo apiInfo() {
		return (new ApiInfoBuilder()).title("STE Web Backend API").description("STE Web Backend API").version("1.0")
				.build();
	}

//	@Bean
//	public OperationCustomizer customize() {
//		return (Operation operation, HandlerMethod OhandlerMethod) -> {
//			DisableSwaggerSecurity methodAnnotation = handlerMethod.getMethodAnnotation(DisableSwaggerSecurity.class);
//			// DisableSecurity 어노테이션있을시 스웨거 시큐리티 설정 삭제
//			if (methodAnnotation != null) {
//				operation.setSecurity(Collections.emptyList());
//			}
//			return operation;
//		};
//	}
}
