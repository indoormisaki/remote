package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

public class Question13Test {


    @Test
    public void test01_最も若いPersonを返却() {
        Person[] persons = new Person[] {new Person("Dad", 60),
                new Person("Sis", 40), new Person("Bro", 20)};
        Person youngestMan = Question13.getYoungestPerson(persons);
        Person expect = new Person("Bro", 20);
        assertEquals(youngestMan.getName(), expect.getName());
        assertEquals(youngestMan.getAge(), expect.getAge());
    }

    @Test
    public void test02_複数の最も若いPersonのうち後方を返却() {
        Person[] persons = new Person[] {new Person("Kid", 25),
                new Person("Sis", 40), new Person("Bro", 25)};
        Person youngestMan = Question13.getYoungestPerson(persons);
        Person expect = new Person("Bro", 25);
        assertEquals(youngestMan.getName(), expect.getName());
        assertEquals(youngestMan.getAge(), expect.getAge());
    }

}
