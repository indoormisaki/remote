package jp.alhinc.springtraining;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit4.SpringRunner;

import jp.alhinc.springtraining.entity.User;
import jp.alhinc.springtraining.mapper.UserMapper;
import jp.alhinc.springtraining.service.GetAllUsersService;

@RunWith(SpringRunner.class)
public class GetAllUsersServiceTest {

	@Mock
	private GetAllUsersService getUserService = new GetAllUsersService();

	@InjectMocks
	private UserMapper mapper;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testGetAllUsersユーザー数11が取得される() {
		List<User> users = getUserService.getAllUsers();
		System.out.println(users.get(0));
		assertEquals(11, users.size());
	}

}
