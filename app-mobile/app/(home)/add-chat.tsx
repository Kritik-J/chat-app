import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import themes from "../../constants/themes";
import useMode from "../../hooks/useMode";
import FormInput from "../../components/FormInput";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import UserListItem from "../../components/UserListItem";
import { useAppDispatch } from "../../hooks/useReduce";
import { searchUsers } from "../../redux/userSlice";
import useUser from "../../hooks/useUser";

const AddChat = () => {
  const mode = useMode();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [search, setSearch] = React.useState("");

  const handleSearch = () => {
    if (!search || search.trim().length === 0) return;

    dispatch(searchUsers({ search: search, page: 1 }));
  };

  const { loading, users } = useUser();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themes[mode].colors.background },
      ]}
    >
      <View
        style={[styles.header, { backgroundColor: themes[mode].colors.header }]}
      >
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
          onPress={() => {
            router.back();
          }}
        />

        <FormInput
          leadingIcon={
            <Octicons
              name="search"
              size={22}
              color={themes[mode].colors.iconColor}
              style={{ marginLeft: 10 }}
            />
          }
          placeholder="Search for a user by email"
          value={search}
          onChangeText={setSearch}
          borderWidth={0}
          backgroundColor={themes[mode].colors.searchBarBackground}
          containerStyle={{ flex: 1 }}
          inputProps={{
            returnKeyType: "search",
            onSubmitEditing: handleSearch,
            autoCapitalize: "none",
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator
              size="large"
              color={themes[mode].colors.highlight}
            />
          </View>
        ) : (
          <>
            {users && (
              <FlatList
                data={users}
                renderItem={({ item, index }) => (
                  <UserListItem
                    key={index}
                    user={item}
                    isLast={index === users.length - 1}
                  />
                )}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    paddingTop: (StatusBar.currentHeight as number) + 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
