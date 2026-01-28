public class WordCount {
    public static void main(String[] args) {        
        String s = "Here is my java program in training";
        String[] words = s.split(" ");
        int count = words.length;
        System.out.println("Total word count: "+count);
    }
}
/*second method
public class WordCount {
    public static void main(String[] args){
        String s="Here is my java program";
        s=s.replace(" ","");
        int count=s.length();
        System.out.println("Total count" + count);
    }
}*/