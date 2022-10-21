import UserManager from '../managers/user_manager';

export const join_party = {
  data: {
    name: 'join_party',
    description: 'Join a party in the server',
    options: [
      {
        name: 'party',
        description: 'Select a party to join',
        type: 3,
        required: true,
        autocomplete: true,
      },
    ],
  },

  /**
   * @param { import('discord.js').ChatInputCommandInteraction } interaction
   * This commented out stuff provides intellisense
   * You can ignore this
   */
  handle: async function (interaction) {
    if (!(await UserManager.getUser(interaction.user.id)))
      return interaction.reply({
        content:
          'You are not registered yet!. Use the </costume:1032293823755321444> command to get registered',
        ephemeral: true,
      });
    if (await UserManager.getParty(interaction.user.id))
      return interaction.reply({
        content: 'You are already in a party',
        ephemeral: true,
      });
    const user = new UserManager(interaction.client, interaction.user.id);
    const partyId = interaction.options.get('party')?.value;
    if (!partyId)
      return await interaction.reply({
        content: 'Something went wrong, party was not found',
        ephemeral: true,
      });
    const channel = await user.joinParty(partyId);
    interaction.reply({
      content: `Joined party. Your channel is <#${channel.id}>`,
      ephemeral: true,
    });
  },
};
