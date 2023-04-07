package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

public class PersonTest {

    @Test
    public void test01_setNameメソッドにて名前変更を確認() {
        String expect = "Donald";
        Person p = new Person("Ken", 22);
        p.setName("Donald");
        assertEquals(p.getName(), expect);
    }

    @Test
    public void test02_setAgeメソッドにて年齢変更を確認() {
        int expect = 30;
        Person p = new Person("Ken", 22);
        p.setAge(30);
        assertEquals(p.getAge(), expect);
    }

    @Test
    public void test03_setAgeメソッド_年齢マイナスの時セットしない() {
        int expect = 22;
        Person p = new Person("Ken", 22);
        p.setAge(-1);
        assertEquals(p.getAge(), expect);
    }

    @Test
    public void test04_isSameAgeメソッドの確認_年齢が等しい場合true() {
        Person person1 = new Person("Ana", 25);
        Person person2 = new Person("Ken", 25);
        boolean actual = person2.isSameAge(person1);
        assertTrue(actual);
    }

    @Test
    public void test05_isSameAgeメソッドの確認_年齢が違う場合false() {
        Person person1 = new Person("Ana", 25);
        Person person2 = new Person("Ken", 24);
        boolean actual = person2.isSameAge(person1);
        assertFalse(actual);
    }

}
