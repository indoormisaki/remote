package jp.alhinc.calculate_sales;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import jp.alhinc.calculate_sales.common.Const;

public class CalculateSalesUnitTest {

    private static final String SEPARATOR =
            System.getProperty("file.separator");
    private static final String TEST_DATA_PATH =
            "resources" + SEPARATOR + "testdata";
    private static final String RESULT_PATH =
            SEPARATOR + Const.RESULT_FILE_NAME;

    private static final String[] EXPECT_1 =
            {"001,札幌支店,123456", "002,仙台支店,2345678", "003,東京支店,34567890",
                    "004,名古屋支店,456789012", "005,大阪支店,5678901234"};

    private static final String[] EXPECT_2 = {"001,札幌支店,0", "002,仙台支店,2345678",
            "003,東京支店,34567890", "004,名古屋支店,456789012", "005,大阪支店,5678901234"};

    private static final String[] EXPECT_3 =
            {"001,札幌支店,123456", "002,仙台支店,2345678", "003,東京支店,34567890",
                    "004,名古屋支店,9999999999", "005,大阪支店,5678901234"};

    private static final String[] EXPECT_4 =
            {"001,札幌支店,123456", "002,仙台支店,2345678", "003,東京支店,34567890",
                    "004,名古屋支店,456789012", "005,大阪支店,-9999999999"};

    private static final String[] EXPECT_5 =
            {"001,札幌支店,9999999999", "002,仙台支店,2345678", "003,東京支店,34567890",
                    "004,名古屋支店,456789012", "005,大阪支店,5678901234"};


    private static final String[] EXPECT_6 = {"001,札幌支店,0", "002,仙台支店,0",
            "003,東京支店,0", "004,名古屋支店,0", "005,大阪支店,0"};


    private static final String[] EXPECT_7 =
            {"001,札幌支店,123456", "002,仙台支店,2345678", "003,東京支店,34567890",
                    "004,名古屋支店,456789012", "005,大阪支店,0"};

    private static final String[] EXPECT_8 =
            {"001,札幌支店,-111111", "002,仙台支店,2345678", "003,東京支店,34567890",
                    "004,名古屋支店,456789012", "005,大阪支店,5678901234"};

    private static final String[] EXPECT_9 = {"hoge",};

    private StandardOutputStream out;

    @Before
    public void before() {
        out = new StandardOutputStream();
        System.setOut(out);
    }

    @After
    public void after() {
        System.setOut(null);
    }

    /**
     *
     * @param path テストデータの入ったフォルダ名
     * @return 売上集計データファイル内の文字列
     */
    private List<String> readFile(String path) {
        File resultFile =
                new File(TEST_DATA_PATH + SEPARATOR + path + RESULT_PATH);
        BufferedReader br = null;
        String s = null;
        List<String> arrayList = new ArrayList<>();
        try {
            br = new BufferedReader(new FileReader(resultFile));
            while ((s = br.readLine()) != null) {
                arrayList.add(s);
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
            fail("結果ファイルが存在しません");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                br.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return arrayList;
    }


    /**
     *
     * @param path テストデータの入ったフォルダ名
     * @return ロックした状態のファイルオブジェクト
     * @throws IOException
     */
    private File leaveOpenFile(String path) throws IOException {
        File resultFile =
                new File(TEST_DATA_PATH + SEPARATOR + path + RESULT_PATH);
        resultFile.setWritable(false, false);
        return resultFile;
    }

    /**
     * ファイル復元
     *
     * @param path テストデータの入ったフォルダ名
     * @param message 書き込みたい文字列（1行のみ）
     * @param targetFileName 対象ファイル名
     */
    public static void overwriteFile(String path, String message,
            String targetFileName) {
        try {
            File file = new File(TEST_DATA_PATH + SEPARATOR + path + SEPARATOR
                    + targetFileName);
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(message);
            bw.newLine();
            bw.close();
        } catch (IOException e) {
            System.out.println(e);
        }
    }

    /**
     * 結果ファイル存在チェック
     *
     * @param path
     * @return 結果ファイル（branch.out）の有無(有:true 無:false)
     */
    private static boolean existsBranchOutFile(String path) {
        File file = new File(path, Const.RESULT_FILE_NAME);
        return file.exists();
    }

    /**
     * 結果ファイル中身チェック
     *
     * @param res 実際のファイル内にあった文字列
     * @param expect 期待値
     */
    private static void checkBranchOutFile(List<String> res, String[] expect) {
        assertThat(res.size(), is(expect.length));

        for (int i = 0; i < expect.length; i++) {
            assertThat(res.get(i), is(expect[i]));
        }
    }

    /**
     * 正常系アサート
     *
     * @param args 起動した際の引数
     * @param testNo テストNo
     * @param expectString 期待値
     */
    private void nomalTestImplementation(String[] args, String testNo,
            String[] expectString) {

        // 正常系
        // エラーメッセージが出ていないか assertEquals(actual(実測値), expect(期待値))
        assertNull(out.readLine());

        // 結果ファイルができているか assertEquals(expect(期待値), actual(実測値))
        assertTrue(existsBranchOutFile(args[0]));

        // 結果ファイル内の値が期待値通りか確認 assertEquals(actual(実測値), expect(期待値))
        List<String> res = readFile(testNo);
        checkBranchOutFile(res, expectString);
    }

    /**
     * 異常系アサート（結果ファイルなし）
     *
     * @param expectErrorMessage 実際に表示されたエラーメッセージ
     * @param args 起動した際の引数
     * @param testNo テストNo
     */
    private void abnomalTestImplementation(String expectErrorMessage,
            String[] args, String testNo) {

        // 特定のエラーメッセージが出ているか assertEquals(actual(実測値), expect(期待値))
        assertThat(out.readLine(), is(expectErrorMessage));

        // 結果ファイルが存在しないこと assertEquals(expect(期待値), actual(実測値))
        assertFalse(existsBranchOutFile(args[0]));
    }

    /**
     * 異常系アサート（結果ファイルあり）
     *
     * @param expectErrorMessage 実際に表示されたエラーメッセージ
     * @param args 起動した際の引数
     * @param testNo テストNo
     * @param expectString 期待値
     */
    private void abnomalTestImplementation(String expectErrorMessage,
            String[] args, String testNo, String[] expectString) {
        // 特定のエラーメッセージが出ているか assertEquals(actual(実測値), expect(期待値))
        assertThat(out.readLine(), is(expectErrorMessage));

        // 結果ファイルができているか assertEquals(expect(期待値), actual(実測値))
        assertEquals(true, existsBranchOutFile(args[0]));

        // 結果ファイル内の値が期待値通りか確認 assertEquals(actual(実測値), expect(期待値))
        List<String> res = readFile(testNo);
        checkBranchOutFile(res, expectString);
    }

    @Test
    public void testNo1_1_1支店定義ファイル読込のとき支店定義ファイルが存在する場合エラーメッセージが出ないこと() {

        String testNo = "1-1-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo1_1_2支店定義ファイル読込のとき支店定義ファイルが存在しない場合エラーメッセージ() {

        String testNo = "1-1-2";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("支店定義ファイルが存在しません", args, testNo);

    }

    @Test
    public void testNo1_2_1支店定義のフォーマットが正しい場合エラーメッセージが出ないこと() {
        String testNo = "1-1-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo1_2_2支店定義ファイル読込のとき支店定義ファイル内にカンマが含まれない場合エラーメッセージ() {

        String testNo = "1-2-2";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("支店定義ファイルのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo1_2_3支店定義ファイル読込のとき支店定義ファイルにカンマが連続で含まれる場合エラーメッセージ() {

        String testNo = "1-2-3";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("支店定義ファイルのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo1_2_4支店定義ファイル読込のとき支店定義ファイルにカンマがまばらに複数で含まれる場合エラーメッセージ() {

        String testNo = "1-2-4";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("支店定義ファイルのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo1_2_5支店定義ファイル読込のとき支店定義ファイルにカンマが末尾で含まれる場合エラーメッセージ() {

        String testNo = "1-2-5";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("支店定義ファイルのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo1_2_6支店定義ファイル読込のとき支店定義ファイルに支店コードが数字2桁の場合エラーメッセージ() {

        String testNo = "1-2-6";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("支店定義ファイルのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo1_2_7支店定義ファイル読込のとき支店定義ファイルに支店コードが数字4桁の場合エラーメッセージ() {

        String testNo = "1-2-7";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("支店定義ファイルのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo1_2_8支店定義ファイル読込のとき支店定義ファイルに支店コードが数字以外を含むの場合エラーメッセージ() {

        String testNo = "1-2-8";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("支店定義ファイルのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo1_2_9支店定義ファイル読込のとき支店定義ファイルに支店名が空の場合エラーメッセージ() {

        String testNo = "1-2-9";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("支店定義ファイルのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo2_1_1集計のとき正常な売上ファイルが存在する場合支店別集計ファイルができること() {

        String testNo = "1-1-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo2_1_2集計のとき正常な連番でない売上ファイルが存在する場合支店別集計ファイルができること() {

        String testNo = "1-1-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo2_1_3集計のとき7桁数字の売上ファイルが存在する場合そのファイルの集計がされていないこと() {

        String testNo = "2-1-3";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo2_1_4集計のとき9桁数字の売上ファイルが存在する場合そのファイルの集計がされていないこと() {

        String testNo = "2-1-4";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo2_1_5集計のとき数字以外を含む8桁の売上ファイルが存在する場合そのファイルの集計がされていないこと() {

        String testNo = "2-1-5";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo2_1_6集計のとき8桁数字と任意の文字列の売上ファイルが存在する場合そのファイルの集計がされていないこと() {

        String testNo = "2-1-6";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo2_1_7集計のとき8桁数字と任意の文字列の売上ファイルが存在する場合そのファイルの集計がされていないこと() {

        String testNo = "2-1-7";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_2);
    }

    @Test
    public void testNo2_2_1集計のとき売上ファイルのフォーマットチェックで行数が2桁の場合エラーメッセージが出ないこと() {

        String testNo = "1-1-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo2_2_2集計のとき売上ファイルのフォーマットチェックで行数が1桁の場合エラーメッセージ() {

        String testNo = "2-2-2";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("00000002.rcdのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo2_2_3集計のとき売上ファイルのフォーマットチェックで行数が3桁の場合エラーメッセージ() {

        String testNo = "2-2-3";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("00000003.rcdのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo2_2_4集計のとき売上ファイルのフォーマットチェックで2行目が10桁の正の数の場合エラーメッセージ() {

        String testNo = "2-2-4";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_3);
    }

    @Test
    public void testNo2_2_5集計のとき売上ファイルのフォーマットチェックで2行目が10桁の負の数の場合エラーメッセージ() {

        String testNo = "2-2-5";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_4);
    }

    @Test
    public void testNo2_2_6集計のとき売上ファイルのフォーマットチェックで2行目が11桁の正の数の場合エラーメッセージ() {

        String testNo = "2-2-6";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("00000001.rcdのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo2_2_7集計のとき売上ファイルのフォーマットチェックで2行目が11桁の負の数の場合エラーメッセージ() {

        String testNo = "2-2-7";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("00000002.rcdのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo2_2_8集計のとき売上ファイルのフォーマットチェックで2行目に数字以外の文字を含む場合エラーメッセージ() {

        String testNo = "2-2-8";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("00000003.rcdのフォーマットが不正です", args, testNo);
    }

    @Test
    public void testNo2_3_1売上ファイルの支店コードの存在チェックで1行目が支店定義にある3桁の数字が存在する場合エラーメッセージが出ないこと() {

        String testNo = "1-1-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo2_3_2売上ファイルの支店コードの存在チェックで1行目が支店定義にない3桁の数字が存在する場合エラーメッセージ() {

        String testNo = "2-3-2";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("00000002.rcdの支店コードが不正です", args, testNo);
    }

    @Test
    public void testNo2_3_3売上ファイルの支店コードの存在チェックで1行目が数字以外を含む3桁が存在する場合エラーメッセージ() {

        String testNo = "2-3-3";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("00000003.rcdの支店コードが不正です", args, testNo);
    }

    @Test
    public void testNo2_3_4売上ファイルの支店コードの存在チェックで1行目が2桁の数字が存在する場合エラーメッセージ() {

        String testNo = "2-3-4";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("00000004.rcdの支店コードが不正です", args, testNo);
    }

    @Test
    public void testNo2_3_5売上ファイルの支店コードの存在チェックで1行目が4桁の数字が存在する場合エラーメッセージ() {

        String testNo = "2-3-5";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("00000005.rcdの支店コードが不正です", args, testNo);
    }

    @Test
    public void testNo2_4_1合計金額桁数チェックのとき合計金額が9999999999の場合エラーメッセージが出ないこと() {

        String testNo = "2-4-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_5);
    }

    @Test
    public void testNo2_4_2合計金額桁数チェックのとき合計金額が10000000000の場合エラーメッセージ() {

        String testNo = "2-4-2";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        abnomalTestImplementation("合計金額が10桁を超えました", args, testNo);
    }

    @Test
    public void testNo3_1_1売上ファイルなし支店数0の場合エラーメッセージが出ず支店別集計ファイルがあること() {

        String testNo = "3-1-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        String[] expect = {};
        nomalTestImplementation(args, testNo, expect);
    }

    @Test
    public void testNo3_1_2売上ファイルあり支店数複数の場合エラーメッセージが出ず支店別集計ファイルがあること() {

        String testNo = "3-1-2";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_6);

    }

    @Test
    public void testNo3_1_3売上ファイルあり支店数複数で売上の存在しない支店ありの場合エラーメッセージが出ず支店別集計ファイルがあること() {

        String testNo = "3-1-3";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_7);

    }

    @Test
    public void testNo3_1_4売上ファイルあり支店数複数支店ありの場合エラーメッセージが出ず支店別集計ファイルがあること() {

        String testNo = "1-1-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);

    }

    @Test
    public void testNo3_1_5売上ファイルあり一部重複あり支店数複数支店ありの場合エラーメッセージが出ず支店別集計ファイルがあること() {

        String testNo = "2-4-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_5);

    }

    @Test
    public void testNo3_1_6売上ファイルあり一部重複ありh支店数複数の場合エラーメッセージが出ず支店別集計ファイルがあること() {

        String testNo = "3-1-6";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_8);

    }

    @Test
    public void testNo3_2_1支店別集計ファイル存在なしの場合エラーメッセージが出ず支店別集計ファイルがあること() {

        String testNo = "1-1-1";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);
    }

    @Test
    public void testNo3_2_2支店別集計ファイル存在ありの場合エラーメッセージが出ず支店別集計ファイルがあること() {

        String testNo = "3-2-2";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        App.main(args);

        nomalTestImplementation(args, testNo, EXPECT_1);

        // 支店別集計ファイルをもとに戻す
        overwriteFile(testNo, "hoge", Const.RESULT_FILE_NAME);
    }

    @Test
    public void testNo3_2_3支店別集計ファイルが他システムで実行されていた場合エラーメッセージが表示支店別集計ファイルが更新されていないこと() {

        String testNo = "3-2-2";
        String[] args = {TEST_DATA_PATH + SEPARATOR + testNo};
        File fc = null;
        try {
            fc = leaveOpenFile(testNo);
            App.main(args);
        } catch (IOException e1) {
            e1.printStackTrace();
        } finally {
            fc.setWritable(true, false);
        }

        abnomalTestImplementation("予期せぬエラーが発生しました", args, testNo, EXPECT_9);
    }
}
